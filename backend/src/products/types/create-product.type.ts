export interface CreateProduct {
  name: string;
  selling_price: number;
  capital_price: number;
  category: string;
  sku: string;
  stock_quantity: number;
  description?: string;
}
