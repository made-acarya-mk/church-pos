import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Product } from './types/product.type';
import type { CreateProduct } from './types/create-product.type';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Product[]> {
    const result = await this.db.query(
      'SELECT * FROM products ORDER BY id DESC',
    );

    return result.rows as Product[];
  }

  async findOne(id: number): Promise<Product | null> {
    const result = await this.db.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as Product;
  }

  async create(data: CreateProduct): Promise<Product> {
    const result = await this.db.query(
      `INSERT INTO products
    (name, selling_price, capital_price, category, sku, stock_quantity, description)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *`,
      [
        data.name,
        data.selling_price,
        data.capital_price,
        data.category,
        data.sku,
        data.stock_quantity,
        data.description ?? null,
      ],
    );

    return result.rows[0] as Product;
  }

  async update(id: number, data: CreateProduct): Promise<Product> {
    const result = await this.db.query(
      `UPDATE products
     SET name = $1,
         selling_price = $2,
         capital_price = $3,
         category = $4,
         sku = $5,
         stock_quantity = $6,
         description = $7,
         updated_at = NOW()
     WHERE id = $8
     RETURNING *`,
      [
        data.name,
        data.selling_price,
        data.capital_price,
        data.category,
        data.sku,
        data.stock_quantity,
        data.description ?? null,
        id,
      ],
    );

    if (result.rows.length === 0) {
      throw new Error('Product not found');
    }

    return result.rows[0] as Product;
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.db.query('DELETE FROM products WHERE id = $1', [id]);

    return {
      message: 'Product deleted successfully',
    };
  }
}
