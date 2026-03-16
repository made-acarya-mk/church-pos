export type CreateProductInput = {
  name: string
  selling_price: number
  capital_price: number
  category: string
  sku: string
  stock_quantity: number
  description?: string
}

export async function createProduct(data: CreateProductInput) {
  const response = await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to create product")
  }

  return response.json()
}