/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  selling_price: number;

  @IsNumber()
  capital_price: number;

  @IsString()
  category: string;

  @IsString()
  sku: string;

  @IsNumber()
  stock_quantity: number;

  @IsOptional()
  @IsString()
  description?: string;
}
