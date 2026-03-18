"use client";

import { useQuery } from "@tanstack/react-query";
import { formatRupiah } from "@/lib/currencyFormat";
import { getTransactions } from "@/features/transactions/api/get-transactions";
import { Transaction } from "@/features/transactions/types/transaction.type";
import { Receipt, Calendar } from "lucide-react";
import { useState } from "react";
import TransactionDetailModal from "@/features/transactions/components/transaction-detail-modal";

export default function HistoryPage() {
	const { data, isLoading } = useQuery<Transaction[]>({
		queryKey: ["transactions"],
		queryFn: getTransactions,
	});

	const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
	const [open, setOpen] = useState(false);

	if (isLoading) {
		return (
			<div className="p-6">
				<div className="p-6 text-center text-gray-500">
					Loading transactions...
				</div>
			</div>
		);
	}

	const totalTransactions = data?.length || 0;

	const totalSales =
		data?.reduce((acc: number, tx: Transaction) => {
			return acc + tx.totalAmount;
		}, 0) || 0;

	return (
		<div className="max-w-3xl mx-auto p-6 space-y-6">
			{/* HEADER */}
			<div>
				<h1 className="text-2xl font-bold">Transaction History</h1>
				<p className="text-sm text-gray-500">View all your transactions</p>
			</div>

			{/* SUMMARY CARDS */}
			<div className="grid grid-cols-2 gap-4">
				{/* Total Transactions */}
				<div className="border rounded-xl p-4 text-center">
					<div className="text-2xl font-bold">{totalTransactions}</div>
					<div className="text-sm text-gray-500">Total Transactions</div>
				</div>

				{/* Total Sales */}
				<div className="border rounded-xl p-4 text-center">
					<div className="text-2xl font-bold">{formatRupiah(totalSales)}</div>
					<div className="text-sm text-gray-500">Total Sales</div>
				</div>

				{/* Profit */}
				<div className="border rounded-xl p-4 text-center text-green-600">
					<div className="text-2xl font-bold">Rp 0</div>
					<div className="text-sm">Total Profit</div>
				</div>

				{/* Margin */}
				<div className="border rounded-xl p-4 text-center text-green-600">
					<div className="text-2xl font-bold">0%</div>
					<div className="text-sm">Profit Margin</div>
				</div>
			</div>

			<div className="space-y-3">
				<input
					type="text"
					placeholder="Search by transaction ID or customer name..."
					className="w-full border rounded-lg px-3 py-2 text-sm"
				/>

				<div className="flex gap-2">
					<select className="border rounded-lg px-3 py-2 text-sm w-full">
						<option>All Status</option>
					</select>

					<button className="border rounded-lg px-3 py-2">
						<Calendar className="w-5 h-5 text-gray-600" />
					</button>
				</div>
			</div>

			{/* LIST */}
			<div className="space-y-4">
				{data?.length === 0 && (
					<div className="text-center text-gray-500">No transactions yet</div>
				)}
				{data?.map((tx) => {
					const totalItems = tx.items.reduce(
						(acc: number, item) => acc + item.quantity,
						0,
					);

					return (
						<div
							key={tx.id}
							className="border rounded-xl p-4 flex justify-between items-center">
							{/* LEFT */}
							<div className="flex gap-3">
								{/* ICON */}
								<div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
									<Receipt className="w-5 h-5 text-gray-600" />
								</div>

								<div>
									<div className="font-semibold">transaction:{tx.id}</div>

									<div className="text-sm text-gray-500">
										{new Date(tx.createdAt).toLocaleString("id-ID")}
									</div>

									<div className="text-sm text-gray-400">
										{totalItems} item{totalItems > 1 ? "s" : ""}
									</div>

									{/* STATUS */}
									<div className="mt-1 text-xs inline-block px-2 py-1 bg-green-100 text-green-600 rounded">
										Completed
									</div>
								</div>
							</div>

							{/* RIGHT */}
							<div className="text-right">
								<div className="font-semibold">
									{formatRupiah(tx.totalAmount)}
								</div>

								<button
									onClick={(e) => {
										e.stopPropagation();
										setSelectedTx(tx);
										setOpen(true);
									}}
									className="text-sm text-gray-500 hover:underline">
									View Details
								</button>
							</div>
						</div>
					);
				})}
			</div>

			<TransactionDetailModal
				open={open}
				onClose={() => setOpen(false)}
				transaction={selectedTx}
			/>
		</div>
	);
}
