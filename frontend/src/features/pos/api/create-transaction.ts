type TransactionItemPayload = {
  productId: number;
  quantity: number;
  price: number;
};

export type CreateTransactionPayload = {
  items: TransactionItemPayload[];
  totalAmount: number;
};

export async function createTransaction(
  payload: CreateTransactionPayload
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/transactions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to create transaction");
  }

  return res.json();
}