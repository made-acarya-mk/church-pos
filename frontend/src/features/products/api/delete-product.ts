import type { Product } from "@/types/product";

export async function deleteProduct(id: number): Promise<Product> {
	const res = await fetch(`http://localhost:3000/products/${id}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		throw new Error("Failed to delete product");
	}

	const data = await res.json();

	return data.data;
}
