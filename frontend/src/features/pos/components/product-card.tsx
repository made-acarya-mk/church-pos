import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type ProductCardProps = {
  name: string
  category: string
  price: number
}

export default function ProductCard({
  name,
  category,
  price,
}: ProductCardProps) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition">
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