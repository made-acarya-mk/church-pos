import ProductForm from "@/features/products/components/product-form";

export default function CreateProductPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Create Product</h1>

      <ProductForm />
    </div>
  );
}