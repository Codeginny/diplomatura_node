import React from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart } from "@phosphor-icons/react";
import { useTheme } from "../hooks/useTheme"; // Usamos el hook useTheme

const Header = ({ onCartClick }) => {
  const { cart } = React.useContext(CartContext);
  const { theme, toggleTheme } = useTheme(); // Usamos el hook useTheme para obtener el tema y la función para cambiarlo

  return (
    <header
      className={`p-4 flex justify-between items-center ${
        theme === "dark" ? "bg-blue-900 text-white" : "bg-blue-600 text-black"
      }`}
    >
      <h1 className="text-2xl font-bold">TechNodo</h1>
      <div className="flex items-center space-x-4 ml-auto"> {/* Contenedor para los botones a la derecha */}
        {/* Botón de carrito */}
        <button onClick={onCartClick} className="relative">
          <ShoppingCart size={32} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cart.length}
            </span>
          )}
        </button>

        {/* Botón de modo oscuro / modo claro */}
        <button onClick={toggleTheme} className="ml-4">
          {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
        </button>
      </div>
    </header>
  );
};

export default Header;
