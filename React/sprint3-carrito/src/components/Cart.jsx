import { useCart } from "../context/CartContext";
import { Trash, Plus, Minus } from "@phosphor-icons/react";
import { useTheme } from "../hooks/useTheme";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  return (
    <aside className="p-4 bg-white dark:bg-gray-900 shadow-lg w-full sm:w-96 fixed top-0 right-0 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-black dark:text-white mb-4">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex items-center justify-between mb-4 border-b pb-2">
              <img src={item.imgSrc} alt={item.name} className="w-16 h-16 rounded object-cover" />
              <div className="flex-1 ml-4">
                <h3 className="text-lg text-black dark:text-white">{item.name}</h3>
                <p className="text-blue-600 dark:text-blue-300 font-bold">${(item.price * item.quantity).toLocaleString("es-AR")}</p>
                <div className="flex items-center mt-1">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400"> <Minus size={16} /> </button>
                  <span className="mx-2 text-black dark:text-white">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400"> <Plus size={16} /> </button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700"> <Trash size={20} /> </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 font-bold text-xl text-black dark:text-white">Total: ${total.toLocaleString("es-AR")}</div>
    </aside>
  );
};

const YourComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

export default Cart;