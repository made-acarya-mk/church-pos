"use client";

import { useQuery } from "@tanstack/react-query";
import { formatRupiah } from "@/lib/currencyFormat";
import { getTransactions } from "@/features/transactions/api/get-transactions";
import { Transaction } from "@/features/transactions/types/transaction.type";

export default function HistoryPage() {
	const { data, isLoading } = useQuery<Transaction[]>({
		queryKey: ["transactions"],
		queryFn: getTransactions,
	});

	if (isLoading) {
		return <div className="p-6">Loading...</div>;
	}

	const totalTransactions = data?.length || 0;

	const totalSales =
		data?.reduce((acc: number, tx: Transaction) => {
			return acc + tx.totalAmount;
		}, 0) || 0;

	return (
		<div className="p-6 space-y-6">
			{/* HEADER */}
			<div>
				<h1 className="text-3xl font-bold">Transaction History</h1>
				<p className="text-gray-500">View all your transactions</p>
			</div>

			{/* SUMMARY CARDS */}
			<div className="grid grid-cols-2 gap-4">
				<div className="border rounded p-4 text-center">
					<div className="text-2xl font-bold">{totalTransactions}</div>
					<div className="text-sm text-gray-500">Total Transactions</div>
				</div>

				<div className="border rounded p-4 text-center">
					<div className="text-2xl font-bold">{formatRupiah(totalSales)}</div>
					<div className="text-sm text-gray-500">Total Sales</div>
				</div>
			</div>

			{/* LIST */}
			<div className="space-y-4">
				{data?.map((tx: Transaction) => {
					const totalItems = tx.items.reduce(
						(acc, item) => acc + item.quantity,
						0,
					);

					return (
						<div key={tx.id} className="border rounded p-4 space-y-2">
							{/* HEADER */}
							<div className="flex justify-between">
								<span className="font-semibold">transaction:{tx.id}</span>
								<span>{formatRupiah(tx.totalAmount)}</span>
							</div>

							{/* DATE */}
							<div className="text-sm text-gray-500">
								{new Date(tx.createdAt).toLocaleString()}
							</div>

							{/* ITEMS */}
							<div className="text-sm">
								{totalItems} item{totalItems > 1 ? "s" : ""}
							</div>

							{/* STATUS */}
							<div className="text-green-600 text-sm">Completed</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
