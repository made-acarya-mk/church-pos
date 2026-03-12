import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
// import { Product } from './types/product.type';
import { Param } from '@nestjs/common';
import type { CreateProduct } from './types/create-product.type';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    const products = await this.productsService.findAll();

    return {
      data: products,
    };
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    const product = await this.productsService.findOne(Number(id));

    return {
      data: product,
    };
  }

  @Post()
  createProduct(@Body() body: CreateProduct) {
    return this.productsService.create(body);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body: CreateProduct) {
    return this.productsService.update(Number(id), body);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.delete(Number(id));
  }
}
