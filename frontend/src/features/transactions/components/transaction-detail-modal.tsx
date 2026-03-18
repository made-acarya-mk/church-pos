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
    (acc: number, item) => acc + item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg max-h-[90vh] flex flex-col">

        {/* HEADER */}
        <div className="p-6 border-b relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <h2 className="text-lg font-semibold">
            Transaction Details
          </h2>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">

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
                  {new Date(transaction.createdAt).toLocaleDateString("id-ID")}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Time</p>
                <p>
                  {new Date(transaction.createdAt).toLocaleTimeString("id-ID")}
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

            <div className="space-y-3">
              {transaction.items.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <div>
                    <p>{item.productName}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} x {formatRupiah(item.price)}
                    </p>
                  </div>

                  <p className="font-medium">
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

            {/* DUMMY PROFIT */}
            <div className="flex justify-between text-green-600">
              <span>Profit</span>
              <span>Rp 0</span>
            </div>

            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>{formatRupiah(transaction.totalAmount)}</span>
            </div>

          </div>

        </div>

        {/* FOOTER (FIXED BUTTON) */}
        <div className="p-4 border-t">
          <button className="w-full bg-black text-white py-2 rounded-lg text-sm hover:opacity-90 transition">
            Download Receipt
          </button>
        </div>

      </div>

    </div>
  );
}