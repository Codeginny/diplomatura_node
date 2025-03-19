// src/context/CartContext.jsx
import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"; // Importa el hook

// Crear el contexto para el carrito
const CartContext = createContext();

// El proveedor del carrito
export const CartProvider = ({ children }) => {
  // Usa useLocalStorage para manejar el carrito con persistencia
  const [cart, setCart] = useLocalStorage("cart", []);

  // Función para agregar al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Calcular el total del carrito
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext }; // Exporta solo el CartContext
