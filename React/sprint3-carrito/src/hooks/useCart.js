import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Asegúrate de que la ruta sea correcta

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
