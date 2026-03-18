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
	removeItem: (id: number) => void;
	updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
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
						i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
					),
				};
			}

			return {
				items: [...state.items, { ...item, quantity: 1 }],
			};
		});
	},

	removeItem: (id: number) => {
		set((state) => ({
			items: state.items.filter((item) => item.id !== id),
		}));
	},

	updateQuantity: (id: number, quantity: number) => {
		set((state) => {
			if (quantity <= 0) {
				return {
					items: state.items.filter((item) => item.id !== id),
				};
			}

			return {
				items: state.items.map((item) =>
					item.id === id ? { ...item, quantity } : item,
				),
			};
		});
	},

	clearCart: () => {
		set({ items: [] });
	},
}));
