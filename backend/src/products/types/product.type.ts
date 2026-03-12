export interface Product {
  id: number;
  name: string;
  selling_price: number;
  capital_price: number;
  category: string;
  sku: string;
  stock_quantity: number;
  description?: string;
  created_at: Date;
  updated_at: Date;
}
