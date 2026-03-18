"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { createProduct } from "@/features/products/api/create-product";
import { updateProduct } from "@/features/products/api/update-product";

import type { ProductFormData, CreateProductPayload } from "@/types/product";

type Props = {
	productId?: number;
	defaultValues?: ProductFormData;
};

export default function ProductForm({ productId, defaultValues }: Props) {
	const router = useRouter();

	const isEditMode = Boolean(productId);

	const [form, setForm] = useState<ProductFormData>({
		name: defaultValues?.name ?? "",
		selling_price: defaultValues?.selling_price ?? "",
		capital_price: defaultValues?.capital_price ?? "",
		category: defaultValues?.category ?? "",
		sku: defaultValues?.sku ?? "",
		stock_quantity: defaultValues?.stock_quantity ?? "",
		description: defaultValues?.description ?? "",
	});

	const mutation = useMutation({
		mutationFn: async () => {
			const payload: CreateProductPayload = {
				name: form.name,
				selling_price: Number(form.selling_price),
				capital_price: Number(form.capital_price),
				category: form.category,
				sku: form.sku,
				stock_quantity: Number(form.stock_quantity),
				description: form.description,
			};

			if (isEditMode) {
				return updateProduct(productId!, payload);
			}

			return createProduct(payload);
		},

		onSuccess: () => {
			router.push("/products");
		},
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutation.mutate();
	};

	const handleClear = () => {
		setForm({
			name: "",
			selling_price: "",
			capital_price: "",
			category: "",
			sku: "",
			stock_quantity: "",
			description: "",
		});
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<div>
				<label className="block mb-1">Product Name</label>
				<input
					name="name"
					className="border p-2 w-full rounded"
					value={form.name}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label className="block mb-1">Selling Price</label>
				<input
					name="selling_price"
					type="number"
					className="border p-2 w-full rounded"
					value={form.selling_price}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label className="block mb-1">Capital Price</label>
				<input
					name="capital_price"
					type="number"
					className="border p-2 w-full rounded"
					value={form.capital_price}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label className="block mb-1">Category</label>
				<input
					name="category"
					className="border p-2 w-full rounded"
					value={form.category}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label className="block mb-1">SKU</label>
				<input
					name="sku"
					className="border p-2 w-full rounded"
					value={form.sku}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label className="block mb-1">Stock Quantity</label>
				<input
					name="stock_quantity"
					type="number"
					className="border p-2 w-full rounded"
					value={form.stock_quantity}
					onChange={handleChange}
				/>
			</div>

			<div>
				<label className="block mb-1">Description</label>
				<textarea
					name="description"
					className="border p-2 w-full rounded"
					value={form.description}
					onChange={handleChange}
				/>
			</div>

			<div className="flex gap-4 pt-4">
				<button
					type="submit"
					disabled={mutation.isPending}
					className="flex-1 bg-black text-white p-3 rounded-lg">
					{mutation.isPending
						? "Saving..."
						: isEditMode
							? "Update Product"
							: "Add Product"}
				</button>

				{!isEditMode && (
					<button
						type="button"
						onClick={handleClear}
						className="flex-1 border p-3 rounded-lg">
						Clear Form
					</button>
				)}

				{isEditMode && (
					<button
						type="button"
						onClick={() => router.push("/products")}
						className="flex-1 border p-3 rounded-lg">
						Cancel
					</button>
				)}
			</div>
		</form>
	);
}
