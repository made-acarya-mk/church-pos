import { Transaction } from "../types/transaction.type";

export async function getTransactions(): Promise<Transaction[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch transactions");
  }

  return data;
}