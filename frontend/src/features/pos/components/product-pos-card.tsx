import { Card, CardContent } from "@/components/ui/card"

type Props = {
  id: number
  name: string
  category: string
  price: number
}

export default function ProductPOSCard({ name, category, price }: Props) {
  return (
    <Card className="cursor-pointer hover:shadow-md transition">
      <CardContent className="p-4">

        <h3 className="font-semibold text-lg">
          {name}
        </h3>

        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
          {category}
        </span>

        <p className="text-xl font-bold mt-2">
          ${price}
        </p>

      </CardContent>
    </Card>
  )
}