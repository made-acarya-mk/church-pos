"use client";

import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import ProductCard from "@/features/pos/components/product-pos-card";
import type { Product } from "@/types/product";
import { useCartStore } from "@/features/pos/store/use-cart";
import { useEffect } from "react";
import { formatRupiah } from "@/lib/currencyFormat";

async function fetchProducts(): Promise<Product[]> {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
	const data = await res.json();
	return data.data;
}

export default function POSPage() {
	const { data, isLoading } = useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: fetchProducts,
	});
	

	const items = useCartStore((state) => state.items);
	useEffect(() => {
		console.log(items);
	});
	const total = items.reduce((acc, item) => {
		return acc + item.price * item.quantity;
	}, 0);

	if (isLoading) return <div className="p-6">Loading products...</div>;

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
			{/* Cart */}
			<div className="mt-8 p-4 border rounded-lg">
				<h2 className="text-xl font-bold mb-4">Cart</h2>

				{items.length === 0 ? (
					<p className="text-gray-500">No items yet</p>
				) : (
					<div className="space-y-2">
						{items.map((item) => (
							<div
								key={item.id}
								className="flex justify-between items-center border p-2 rounded">
								<div>
									<p className="font-medium">{item.name}</p>
									<p className="text-sm text-gray-500">
										{item.quantity} x {formatRupiah(item.price)}
									</p>
								</div>

								<p className="font-semibold">
									{formatRupiah(item.price * item.quantity)}
								</p>
							</div>
						))}
					</div>
				)}
			</div>

			{/* TOTAL CART */}
			<div className="mt-4 border-t pt-4 flex justify-between font-bold text-lg">
				<span>Total</span>
				<span>{formatRupiah(total)}</span>
			</div>
		</div>
	);
}
