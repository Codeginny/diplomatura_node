import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useTheme } from "../hooks/useTheme"; // Importamos el hook correctamente
import { X, Trash, Plus, Minus } from "@phosphor-icons/react";

const CartModal = ({ isOpen, onClose }) => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, total } = useContext(CartContext);
  const { theme } = useTheme(); // Obtén el tema usando el hook

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end">
      <div
        className={`w-96 h-full p-4 ${theme === "dark" ? "bg-blue-900 text-white" : "bg-white text-black"} overflow-y-auto`}  // Se agrega 'overflow-y-auto' para permitir el scroll
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Tu Carrito</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        {cart.length === 0 ? (
          <p className="text-center">Tu carrito está vacío</p>
        ) : (
          <div>
            {cart.map((product) => (
              <div key={product.id} className="flex justify-between items-center mb-4 border-b pb-2">
                <img src={product.imgSrc} alt={product.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1 px-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-500">${product.price.toLocaleString()} ARS</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => decreaseQuantity(product.id)} className="bg-gray-300 p-1 rounded">
                      <Minus size={16} />
                    </button>
                    <span>{product.quantity}</span>
                    <button onClick={() => increaseQuantity(product.id)} className="bg-gray-300 p-1 rounded">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(product.id)} className="text-white">
                  <Trash size={20} />
                </button>
              </div>
            ))}
            <div className="flex justify-between mt-4 text-lg font-bold">
              <span>Total:</span>
              <span>${total.toLocaleString()} ARS</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700 transition">
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
