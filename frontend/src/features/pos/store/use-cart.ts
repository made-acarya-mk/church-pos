import { create } from "zustand";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: (item) => {
    console.log("ADD ITEM TRIGGERED", item);

    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    });
  },
}));