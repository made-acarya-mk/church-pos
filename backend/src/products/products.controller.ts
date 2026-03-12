import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './types/product.type';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }
}
