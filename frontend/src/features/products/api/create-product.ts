import type { CreateProductPayload, Product } from "@/types/product"

export async function createProduct(
  payload: CreateProductPayload
): Promise<Product> {

  const res = await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Failed to create product")
  }

  const data = await res.json()

  return data.data
}