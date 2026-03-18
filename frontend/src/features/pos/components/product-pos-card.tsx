import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/features/pos/store/use-cart";
import { formatRupiah } from "@/lib/currencyFormat";

type Props = {
	id: number;
	name: string;
	category: string;
	price: number;
};

export default function ProductPOSCard({ id, name, category, price }: Props) {
	const addItem = useCartStore((state) => state.addItem);
	return (
		<Card
			className="cursor-pointer hover:shadow-md transition"
			onClick={(e) => {
				e.stopPropagation();
				addItem({ id, name, price });
			}}>
			<CardContent className="p-4">
				<h3 className="font-semibold text-lg">{name}</h3>

				<span className="text-xs bg-gray-200 px-2 py-1 rounded">
					{category}
				</span>

				<p className="text-xl font-bold mt-2">
					{formatRupiah(price)}
				</p>
			</CardContent>
		</Card>
	);
}
