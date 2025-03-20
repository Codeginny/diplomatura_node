// src/components/Cart.jsx
import React from "react";
import { useCart } from "../hooks/useCart"; // Usamos el hook para manejar el carrito
import { Trash, Plus, Minus, Sun, Moon } from "@phosphor-icons/react"; // Importamos los íconos, incluyendo sol y luna
import { useTheme } from "../hooks/useTheme"; // Usamos el hook de tema para cambiar entre modo claro y oscuro

const Cart = () => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, total } = useCart();
  const { theme, toggleTheme } = useTheme(); // Obtenemos el tema actual y la función para cambiarlo

  return (
    <div className={`fixed top-16 right-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-80 max-h-[400px] overflow-y-auto transition-all`}>
      {/* Botón de modo oscuro con icono de sol/luna */}
      <button
        onClick={toggleTheme} // Llama a la función para cambiar entre claro y oscuro
        className="absolute top-4 left-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
      >
        {theme === "dark" ? <Sun size={24} className="text-yellow-500" /> : <Moon size={24} className="text-blue-500" />}
      </button>

      {/* Título del carrito */}
      <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Carrito</h3>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">El carrito está vacío</p>
      ) : (
        <div>
          {/* Mapeamos los productos en el carrito */}
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h4 className="text-sm font-semibold text-black dark:text-white">{item.name}</h4>
                  {/* Establecemos el precio en blanco en modo oscuro */}
                  <p className="text-sm font-bold text-blue-600 dark:text-white">${item.price.toLocaleString("es-AR")}</p>
                </div>
              </div>

              {/* Botones de aumentar y disminuir */}
              <div className="flex items-center gap-2">
                {/* Botón de disminuir cantidad */}
                <button
                  onClick={() => decreaseQuantity(item.id)} // Llama al método de disminuir cantidad
                  className="text-green-500 dark:text-green-400"
                >
                  <Minus size={24} />
                </button>
                <span className="text-lg font-bold text-black dark:text-white">{item.quantity}</span>
                {/* Botón de aumentar cantidad */}
                <button
                  onClick={() => increaseQuantity(item.id)} // Llama al método de aumentar cantidad
                  className="text-green-500 dark:text-green-400"
                >
                  <Plus size={24} />
                </button>
              </div>

              {/* Botón de eliminar producto */}
              <button
                onClick={() => removeFromCart(item.id)} // Llama al método de eliminar producto
                className="text-white bg-gray-500 dark:bg-gray-600 p-2 rounded-full hover:bg-gray-600"
              >
                {/* Aseguramos que el icono sea blanco */}
                <Trash size={24} className="text-white" />
              </button>
            </div>
          ))}

          {/* Mostrar el total */}
          <div className="mt-4">
            <p className="text-xl font-semibold text-black dark:text-white">Total: ${total.toLocaleString("es-AR")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
