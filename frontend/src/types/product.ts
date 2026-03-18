export type Product = {
  id: number
  name: string
  selling_price: number
  capital_price: number
  category: string
  sku: string
  stock_quantity: number
  description?: string
  created_at: string
  updated_at: string
}

export type ProductFormData = {
  name: string
  selling_price: number | string
  capital_price: number | string
  category: string
  sku: string
  stock_quantity: number | string
  description?: string
}

export type CreateProductPayload = {
  name: string
  selling_price: number
  capital_price: number
  category: string
  sku: string
  stock_quantity: number
  description?: string
}