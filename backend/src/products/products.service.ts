import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Product } from './types/product.type';

@Injectable()
export class ProductsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(): Promise<Product[]> {
    const result = await this.db.query(
      'SELECT * FROM products ORDER BY id DESC',
    );

    return result.rows as Product[];
  }
}
