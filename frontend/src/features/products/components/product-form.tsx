"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "@/features/products/api/create-product";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    selling_price: "",
    capital_price: "",
    category: "",
    sku: "",
    stock_quantity: "",
    description: "",
  });

	const router = useRouter()
  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      alert("Product created successfully");

      setForm({
        name: "",
        selling_price: "",
        capital_price: "",
        category: "",
        sku: "",
        stock_quantity: "",
        description: "",
      });

			router.push("/products")
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      ...form,
      selling_price: Number(form.selling_price),
      capital_price: Number(form.capital_price),
      stock_quantity: Number(form.stock_quantity),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">

      <div>
        <label className="block mb-1">Product Name</label>
        <input
          name="name"
          className="border p-2 w-full"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1">Selling Price</label>
        <input
          name="selling_price"
          type="number"
          className="border p-2 w-full"
          value={form.selling_price}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1">Capital Price</label>
        <input
          name="capital_price"
          type="number"
          className="border p-2 w-full"
          value={form.capital_price}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1">Category</label>
        <input
          name="category"
          className="border p-2 w-full"
          value={form.category}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1">SKU</label>
        <input
          name="sku"
          className="border p-2 w-full"
          value={form.sku}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1">Stock Quantity</label>
        <input
          name="stock_quantity"
          type="number"
          className="border p-2 w-full"
          value={form.stock_quantity}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          className="border p-2 w-full"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <button
        disabled={mutation.isPending}
        className="bg-black text-white p-2 disabled:opacity-50"
      >
        {mutation.isPending ? "Creating..." : "Create Product"}
      </button>

    </form>
  );
}