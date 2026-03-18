import type { CreateProductPayload, Product } from "@/types/product"

export async function updateProduct(
  id: number,
  payload: CreateProductPayload
): Promise<Product> {

  const res = await fetch(`http://localhost:3000/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    throw new Error("Failed to update product")
  }

  const data = await res.json()

  return data.data
}