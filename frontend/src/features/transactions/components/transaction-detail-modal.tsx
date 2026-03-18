"use client";

import { X } from "lucide-react";
import { formatRupiah } from "@/lib/currencyFormat";
import { Transaction } from "../types/transaction.type";

type Props = {
  open: boolean;
  onClose: () => void;
  transaction: Transaction | null;
};

export default function TransactionDetailModal({
  open,
  onClose,
  transaction,
}: Props) {
  if (!open || !transaction) return null;

  const totalItems = transaction.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative shadow-lg">

        {/* CLOSE */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* HEADER */}
        <h2 className="text-lg font-semibold mb-4">
          Transaction Details
        </h2>

        {/* INFO */}
        <div className="space-y-3 text-sm">

          <div>
            <p className="text-gray-500">Transaction ID</p>
            <p className="font-medium">
              transaction:{transaction.id}
            </p>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Date</p>
              <p>
                {new Date(transaction.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-gray-500">Time</p>
              <p>
                {new Date(transaction.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* DUMMY */}
          <div>
            <p className="text-gray-500">Customer</p>
            <p>-</p>
          </div>

          <div>
            <p className="text-gray-500">Payment Method</p>
            <p>Cash</p>
          </div>

        </div>

        <hr className="my-4" />

        {/* ITEMS */}
        <div>
          <p className="font-medium mb-2">Items Purchased</p>

          <div className="space-y-2">
            {transaction.items.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <div>
                  <p>{item.productName}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} x {formatRupiah(item.price)}
                  </p>
                </div>

                <p>
                  {formatRupiah(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-4" />

        {/* SUMMARY */}
        <div className="space-y-2 text-sm">

          <div className="flex justify-between text-gray-500">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>{formatRupiah(transaction.totalAmount)}</span>
          </div>

        </div>

        <button className="mt-4 w-full bg-black text-white py-2 rounded-lg text-sm">
          Download Receipt
        </button>

      </div>
    </div>
  );
}