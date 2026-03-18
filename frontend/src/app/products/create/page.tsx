"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import ProductForm from "@/features/products/components/product-form"
import { Card, CardContent } from "@/components/ui/card"

export default function CreateProductPage() {
  const router = useRouter()

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">

        <button
          onClick={() => router.back()}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold">
            Add New Product
          </h1>

          <p className="text-gray-500">
            Add a new product to your inventory
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card>
        <CardContent className="p-6 space-y-4">

          <h2 className="font-semibold text-lg">
            Product Information
          </h2>

          <ProductForm />

        </CardContent>
      </Card>

    </div>
  )
}