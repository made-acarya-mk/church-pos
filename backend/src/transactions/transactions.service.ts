import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTransactionPayload } from './types/transaction.type';
import { TransactionHistory } from './types/transaction-history.type';

@Injectable()
export class TransactionsService {
  constructor(private readonly db: DatabaseService) {}

  async create(body: CreateTransactionPayload) {
    const { items, totalAmount } = body;

    if (!items || items.length === 0) {
      throw new BadRequestException('Transaction items cannot be empty');
    }

    const client = await this.db.getClient();

    try {
      await client.query('BEGIN');

      for (const item of items) {
        const result = await client.query<{ stock_quantity: number }>(
          `SELECT stock_quantity FROM products WHERE id = $1`,
          [item.productId],
        );

        const product = result.rows[0];

        if (!product) {
          throw new BadRequestException(
            `Product with ID ${item.productId} not found`,
          );
        }

        if (product.stock_quantity < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ID ${item.productId}`,
          );
        }
      }

      const transactionResult = await client.query<{ id: number }>(
        `INSERT INTO transactions (total_amount)
         VALUES ($1)
         RETURNING id`,
        [totalAmount],
      );

      if (!transactionResult.rows.length) {
        throw new BadRequestException('Transaction insert failed');
      }

      const transactionId = transactionResult.rows[0].id;

      for (const item of items) {
        await client.query(
          `INSERT INTO transaction_items 
           (transaction_id, product_id, quantity, price)
           VALUES ($1, $2, $3, $4)`,
          [transactionId, item.productId, item.quantity, item.price],
        );

        const updateResult = await client.query(
          `UPDATE products
           SET stock_quantity = stock_quantity - $1
           WHERE id = $2
           AND stock_quantity >= $1`,
          [item.quantity, item.productId],
        );

        if (!updateResult.rowCount || updateResult.rowCount === 0) {
          throw new BadRequestException(
            `Failed to update stock for product ID ${item.productId}`,
          );
        }
      }

      await client.query('COMMIT');

      return {
        message: 'Transaction created successfully',
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('TRANSACTION ERROR:', error.message);
      } else {
        console.error('TRANSACTION ERROR:', error);
      }

      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async findAll(): Promise<TransactionHistory[]> {
    const result = await this.db.query<{
      transaction_id: number;
      total_amount: number;
      created_at: string;
      product_name: string;
      quantity: number;
      price: number;
    }>(`
    SELECT 
      t.id as transaction_id,
      t.total_amount,
      t.created_at,
      p.name as product_name,
      ti.quantity,
      ti.price
    FROM transactions t
    JOIN transaction_items ti ON ti.transaction_id = t.id
    JOIN products p ON p.id = ti.product_id
    ORDER BY t.created_at DESC
  `);

    const map = new Map<number, TransactionHistory>();

    for (const row of result.rows) {
      if (!map.has(row.transaction_id)) {
        map.set(row.transaction_id, {
          id: row.transaction_id,
          totalAmount: row.total_amount,
          createdAt: row.created_at,
          items: [],
        });
      }

      const transaction = map.get(row.transaction_id);

      if (transaction) {
        transaction.items.push({
          productName: row.product_name,
          quantity: row.quantity,
          price: row.price,
        });
      }
    }

    return Array.from(map.values());
  }
}
