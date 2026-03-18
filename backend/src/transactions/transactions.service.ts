import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTransactionPayload } from './types/transaction.type';

@Injectable()
export class TransactionsService {
  constructor(private readonly db: DatabaseService) {}

  async create(body: CreateTransactionPayload) {
    const { items, totalAmount } = body;

    for (const item of items) {
      const result = await this.db.query<{ stock_quantity: number }>(
        `SELECT stock_quantity FROM products WHERE id = $1`,
        [item.productId],
      );

      const product = result.rows[0];

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      if (product.stock_quantity < item.quantity) {
        throw new Error(`Insufficient stock for product ID ${item.productId}`);
      }
    }

    const transactionResult = await this.db.query<{ id: number }>(
      `INSERT INTO transactions (total_amount)
       VALUES ($1)
       RETURNING id`,
      [totalAmount],
    );

    if (!transactionResult.rows.length) {
      throw new Error('Transaction insert failed');
    }

    const transactionId = transactionResult.rows[0].id;

    for (const item of items) {
      await this.db.query(
        `INSERT INTO transaction_items 
         (transaction_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [transactionId, item.productId, item.quantity, item.price],
      );

      await this.db.query(
        `UPDATE products
         SET stock_quantity = stock_quantity - $1
         WHERE id = $2`,
        [item.quantity, item.productId],
      );
    }

    return {
      message: 'Transaction created successfully',
    };
  }
}
