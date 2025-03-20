import React, { useState } from "react";
import { useCart } from "../hooks/useCart";
import { useProductList } from "../hooks/useProductList";
import { ShoppingCart } from "@phosphor-icons/react";
import { useTheme } from "../hooks/useTheme";

const ProductList = () => {
  const { addToCart } = useCart();
  const { products } = useProductList();
  const { theme } = useTheme();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`${product.name} agregado a tu carrito`); // Aquí se corrige la interpolación
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-[#1F2937] transition-colors duration-300">
      {/* Agregado padding superior para espacio debajo del header */}
      <section className="container mx-auto px-4 py-8 pt-24 mt-48">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-4 rounded-lg shadow-lg bg-white dark:bg-[#374151] transition-colors duration-300"
            >
              <div className="relative pb-[100%] w-full mb-4">
                <img
                  src={product.imgSrc}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover rounded"
                />
              </div>
              {/* Clase condicional para el color del texto */}
              <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                {product.name}
              </h3>
              <p className="text-blue-600 dark:text-blue-300 font-bold">
                ${product.price.toLocaleString("es-AR")}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700 transition"
              >
                <ShoppingCart size={20} /> Agregar al carrito
              </button>
            </div>
          ))}
        </div>

        {showMessage && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg">
            {message}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductList;
