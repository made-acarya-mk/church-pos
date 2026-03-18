import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Trash2 } from "lucide-react"

type Props = {
  name: string
  sku: string
  stock: number
  price: number
  category: string
}

export default function ProductManagementItem({
  name,
  sku,
  stock,
  price,
  category,
}: Props) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">

        <div className="flex items-center gap-4">

          <div className="bg-gray-200 p-3 rounded-xl">
            <Package size={20}/>
          </div>

          <div>

            <h3 className="font-semibold text-lg">
              {name}
            </h3>

            <p className="text-gray-500 text-sm">
              SKU: {sku} • Stock: {stock}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-4">

          <div className="text-right">

            <p className="font-semibold">
              ${price}
            </p>

            <Badge variant="secondary">
              {category}
            </Badge>

          </div>

          <button className="text-red-500 hover:bg-red-100 p-2 rounded-md">
            <Trash2 size={18}/>
          </button>

        </div>

      </CardContent>
    </Card>
  )
}