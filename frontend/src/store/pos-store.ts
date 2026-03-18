import { create } from "zustand"

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

type POSStore = {
  cart: CartItem[]
  addToCart: (product: { id: number; name: string; price: number }) => void
}

export const usePOSStore = create<POSStore>((set, get) => ({
  cart: [],

  addToCart: (product) => {
    const existing = get().cart.find((item) => item.id === product.id)

    if (existing) {
      set({
        cart: get().cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      })
    } else {
      set({
        cart: [...get().cart, { ...product, quantity: 1 }],
      })
    }
  },
}))