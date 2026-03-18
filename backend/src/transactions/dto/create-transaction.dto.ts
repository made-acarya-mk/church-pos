import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TransactionItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;

  @IsInt()
  price: number;
}

export class CreateTransactionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionItemDto)
  items: TransactionItemDto[];

  @IsInt()
  totalAmount: number;
}
