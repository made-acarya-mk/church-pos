"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deleteProduct } from "@/features/products/api/delete-product";

import type { Product } from "@/types/product";

async function fetchProducts(): Promise<Product[]> {
	const res = await fetch("http://localhost:3000/products");
	const data = await res.json();
	return data.data;
}

export default function ProductsPage() {
	const router = useRouter();
	const queryClient = useQueryClient();

	const { data, isLoading } = useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: fetchProducts,
	});

	const deleteMutation = useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["products"],
			});
		},
	});

	if (isLoading) {
		return <div className="p-6">Loading...</div>;
	}

	return (
		<div className="p-6 max-w-xl mx-auto space-y-6">
			{/* Header */}

			<div className="flex items-center gap-3">
				<button
					onClick={() => router.push("/add")}
					className="p-2 rounded-md hover:bg-gray-100">
					<ArrowLeft size={20} />
				</button>

				<div>
					<h1 className="text-2xl font-bold">Select Item to Update</h1>

					<p className="text-gray-500">Choose a product to edit or delete</p>
				</div>
			</div>

			{/* Product List */}

			<div className="space-y-4">
				{data?.map((product) => (
					<Card
						key={product.id}
						onClick={() => router.push(`/products/${product.id}/edit`)}
						className="cursor-pointer hover:shadow-md transition">
						<CardContent className="flex items-center justify-between p-4">
							<div className="flex items-center gap-4">
								<div className="bg-gray-200 p-3 rounded-xl">
									<Package size={20} />
								</div>

								<div>
									<h3 className="font-semibold text-lg">{product.name}</h3>

									<p className="text-gray-500 text-sm">
										SKU: {product.sku} • Stock: {product.stock_quantity}
									</p>
								</div>
							</div>

							<div className="flex items-center gap-4">
								<div className="text-right">
									<p className="font-semibold">${product.selling_price}</p>

									<Badge variant="secondary">{product.category}</Badge>
								</div>

								{/* Delete Button */}

								<AlertDialog>
									<AlertDialogTrigger asChild>
										<button
											onClick={(e) => e.stopPropagation()}
											className="text-red-500 hover:bg-red-100 p-2 rounded-md">
											<Trash2 size={18} />
										</button>
									</AlertDialogTrigger>

									<AlertDialogContent>
										<AlertDialogHeader>
											<AlertDialogTitle>Delete Product</AlertDialogTitle>

											<AlertDialogDescription>
												Are you sure you want to delete &quot;{product.name}&quot;? This
												action cannot be undone.
											</AlertDialogDescription>
										</AlertDialogHeader>

										<AlertDialogFooter>
											<AlertDialogCancel>Cancel</AlertDialogCancel>

											<AlertDialogAction
												onClick={() => deleteMutation.mutate(product.id)}
												className="bg-red-600 hover:bg-red-700">
												Delete
											</AlertDialogAction>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialog>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
