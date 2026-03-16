"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usePOSStore } from "@/store/pos-store"

type ProductCardProps = {
  id: number
  name: string
  category: string
  price: number
}

export default function ProductCard({
  id,
  name,
  category,
  price,
}: ProductCardProps) {

  const addToCart = usePOSStore((state) => state.addToCart)

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition"
      onClick={() =>
        addToCart({
          id,
          name,
          price,
        })
      }
    >
      <CardContent className="p-4 space-y-2">

        <h3 className="text-lg font-semibold">{name}</h3>

        <Badge variant="secondary">
          {category}
        </Badge>

        <p className="text-xl font-bold">
          Rp {price}
        </p>

      </CardContent>
    </Card>
  )
}