import { createContext, useContext, useState, type ReactNode } from "react";

interface CartItem {
  id: string;
  variantId: string;
  title: string;
  price: string;
  currency: string;
  image?: string;
  size?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  totalQuantity: number;
  subtotal: string;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (variantId: string) => void;
  updateQty: (variantId: string, qty: number) => void;
}

const CartContext = createContext<CartContextType>({
  items: [],
  totalQuantity: 0,
  subtotal: "$0.00",
  addItem: () => {},
  removeItem: () => {},
  updateQty: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(item: Omit<CartItem, "quantity">) {
    setItems((prev) => {
      const existing = prev.find((i) => i.variantId === item.variantId);
      if (existing) {
        return prev.map((i) =>
          i.variantId === item.variantId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }

  function removeItem(variantId: string) {
    setItems((prev) => prev.filter((i) => i.variantId !== variantId));
  }

  function updateQty(variantId: string, qty: number) {
    if (qty <= 0) {
      removeItem(variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.variantId === variantId ? { ...i, quantity: qty } : i))
    );
  }

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotalNum = items.reduce(
    (sum, i) => sum + parseFloat(i.price) * i.quantity,
    0
  );
  const subtotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: items[0]?.currency ?? "USD",
  }).format(subtotalNum);

  return (
    <CartContext.Provider
      value={{ items, totalQuantity, subtotal, addItem, removeItem, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
