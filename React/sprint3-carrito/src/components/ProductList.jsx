// src/components/ProductList.jsx
import React from "react";
import { useCart } from "../hooks/useCart"; // Usa el hook del carrito
import { useProductList } from "../hooks/useProductList"; // Importamos correctamente el hook useProductList
import { ShoppingCart } from "@phosphor-icons/react";
import { useTheme } from "../hooks/useTheme"; // Usamos el hook useTheme

const ProductList = () => {
  const { addToCart } = useCart();
  const { products } = useProductList(); // Usamos useProductList para obtener los productos
  const { theme } = useTheme();

  return (
    <section className={`p-4 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <h2 className="text-3xl font-bold">Productos Disponibles</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <img src={product.imgSrc} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2 text-black dark:text-white">{product.name}</h3>
            <p className="text-blue-600 dark:text-blue-300 font-bold">${product.price.toLocaleString("es-AR")}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <ShoppingCart size={20} /> Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
