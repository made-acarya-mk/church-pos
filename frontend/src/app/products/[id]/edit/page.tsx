"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import ProductForm from "@/features/products/components/product-form";
import type { Product, ProductFormData } from "@/types/product";

async function fetchProduct(id: string): Promise<Product> {
	const res = await fetch(`process.env.NEXT_PUBLIC_API_URL/products/${id}`);

	if (!res.ok) {
		throw new Error("Failed to fetch product");
	}

	const data = await res.json();
	return data.data;
}

export default function EditProductPage() {
	const params = useParams();
	const router = useRouter();

	const { data, isLoading } = useQuery<Product>({
		queryKey: ["product", params.id],
		queryFn: () => fetchProduct(params.id as string),
	});

	if (isLoading) {
		return <div className="p-6">Loading...</div>;
	}

	if (!data) {
		return <div className="p-6">Product not found</div>;
	}

	const defaultValues: ProductFormData = {
		name: data.name,
		selling_price: data.selling_price,
		capital_price: data.capital_price,
		category: data.category,
		sku: data.sku,
		stock_quantity: data.stock_quantity,
		description: data.description ?? "",
	};

	return (
		<div className="p-6 max-w-xl mx-auto space-y-6">
			{/* Header */}
			<div className="flex items-center gap-3">
				<button
					onClick={() => router.back()}
					className="p-2 rounded-md hover:bg-gray-100">
					<ArrowLeft size={20} />
				</button>

				<div>
					<h1 className="text-2xl font-bold">Update Product</h1>

					<p className="text-gray-500">Update {data.name} information</p>
				</div>
			</div>

			{/* Form */}
			<ProductForm productId={data.id} defaultValues={defaultValues} />
		</div>
	);
}
