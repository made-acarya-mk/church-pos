"use client"

import { Input } from "@/components/ui/input"
import ProductCard from "@/features/pos/components/product-card"

export default function POSPage() {
  return (
    <div className="p-6 space-y-6">

      <h1 className="text-3xl font-bold">
        Point of Sale
      </h1>

      <Input placeholder="Search products..." />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        <ProductCard
          name="Coffee"
          category="beverages"
          price={4500}
        />

        <ProductCard
          name="Sandwich"
          category="food"
          price={8999}
        />

        <ProductCard
          name="Tea"
          category="beverages"
          price={3000}
        />

      </div>

    </div>
  )
}