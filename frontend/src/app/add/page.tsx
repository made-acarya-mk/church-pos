"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddPage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Product Management
        </h1>

        <p className="text-gray-500">
          Add new products or update existing ones
        </p>
      </div>

      {/* Add New Item */}
      <Card
        className="cursor-pointer hover:shadow-md transition"
        onClick={() => router.push("/products/create")}
      >
        <CardContent className="flex items-center gap-4 p-6">

          <div className="bg-gray-200 p-4 rounded-xl">
            <Plus size={24}/>
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              Add New Item
            </h2>

            <p className="text-gray-500">
              Create a new product in your inventory
            </p>
          </div>

        </CardContent>
      </Card>

      {/* Update Item */}
      <Card
        className="cursor-pointer hover:shadow-md transition"
        onClick={() => router.push("/products")}
      >
        <CardContent className="flex items-center gap-4 p-6">

          <div className="bg-gray-200 p-4 rounded-xl">
            <Pencil size={24}/>
          </div>

          <div>
            <h2 className="font-semibold text-lg">
              Update Item
            </h2>

            <p className="text-gray-500">
              Edit existing products in your catalog
            </p>
          </div>

        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardContent className="p-6">

          <h2 className="font-semibold mb-4">
            Quick Stats
          </h2>

          <div className="flex justify-between text-center">

            <div>
              <p className="text-2xl font-bold">16</p>
              <p className="text-gray-500">Total Items</p>
            </div>

            <div>
              <p className="text-2xl font-bold">1005</p>
              <p className="text-gray-500">Total Stock</p>
            </div>

            <div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-gray-500">Categories</p>
            </div>

          </div>

        </CardContent>
      </Card>

    </div>
  )
}