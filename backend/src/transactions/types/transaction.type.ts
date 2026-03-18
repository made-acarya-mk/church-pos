export type TransactionItem = {
  productId: number;
  quantity: number;
  price: number;
};

export type CreateTransactionPayload = {
  items: TransactionItem[];
  totalAmount: number;
};
