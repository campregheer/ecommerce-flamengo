import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantidade: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQuantity(id, newQty) {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantidade: newQty } : item
      )
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.preco * item.quantidade,
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, total }}
    >
      {children}
    </CartContext.Provider>
  );
}
