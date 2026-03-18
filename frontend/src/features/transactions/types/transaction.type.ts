export type TransactionItem = {
  productName: string;
  quantity: number;
  price: number;
};

export type Transaction = {
  id: number;
  totalAmount: number;
  createdAt: string;
  items: TransactionItem[];
};
