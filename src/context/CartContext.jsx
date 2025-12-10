import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

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
        if(existing.quantidade >= product.quantidade_estoque) {
          toast.error("Quantidade máxima disponível no estoque atingida!");
          return prev;
        }

        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

        if(product.quantidade_estoque <= 0){
          toast.error("Produto esgotado no estoque!");
          return prev;
        }
      

      return [...prev, { ...product, quantidade: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function updateQuantity(id, newQty) {
setCart((prev) =>
    prev.map((item) => {
      if (item.id === id) {

        // Impede quantidade acima do estoque do Firebase
        if (newQty > item.quantidade_estoque) {
          toast.error("Quantidade maior do que o estoque disponível.");
          return item;
        }

        // Impede valores menores do que 1
        if (newQty < 1) {
          return item;
        }

        return { ...item, quantidade: newQty };
      }
      return item;
    })
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.preco * item.quantidade,
    0
  );

function clearCart() {
  setCart([]);
  localStorage.removeItem("cart");
}


  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, total, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
