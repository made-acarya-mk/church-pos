"use client";

import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import ProductCard from "@/features/pos/components/product-pos-card";
import type { Product } from "@/types/product";

async function fetchProducts(): Promise<Product[]> {
	const res = await fetch("http://localhost:3000/products");
	const data = await res.json();
	return data.data;
}

export default function POSPage() {
	const { data, isLoading } = useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: fetchProducts,
	});

	if (isLoading) return <div className="p-6">Loading...</div>;

	return (
		<div className="p-6 space-y-6">
			<h1 className="text-3xl font-bold">Point of Sale</h1>

			<Input placeholder="Search products..." />

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{data?.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						category={product.category}
						price={product.selling_price}
					/>
				))}
			</div>
		</div>
	);
}
