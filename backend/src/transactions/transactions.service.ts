import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTransactionPayload } from './types/transaction.type';

@Injectable()
export class TransactionsService {
  constructor(private readonly db: DatabaseService) {}

  async create(body: CreateTransactionPayload) {
    const { items, totalAmount } = body;

    const transactionResult = await this.db.query<{ id: number }>(
      `INSERT INTO transactions (total_amount)
        VALUES ($1)
        RETURNING id`,
      [totalAmount],
    );

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
    if (!transactionResult.rows.length) {
      throw new Error('Transaction insert failed');
    }

    return {
      message: 'Transaction created successfully',
    };
  }
}
