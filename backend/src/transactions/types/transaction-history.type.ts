export type TransactionHistoryItem = {
  productName: string;
  quantity: number;
  price: number;
};

export type TransactionHistory = {
  id: number;
  totalAmount: number;
  createdAt: string;
  items: TransactionHistoryItem[];
};
