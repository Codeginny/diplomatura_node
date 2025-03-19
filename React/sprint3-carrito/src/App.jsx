import React, { useState } from "react";
import CartModal from "./components/CartModal";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-tech-light text-tech-dark dark:bg-tech-dark dark:text-tech-light">
          {/* Header que contiene el botón de carrito */}
          <Header onCartClick={() => setIsCartOpen(true)} />
          
          {/* Lista de productos */}
          <ProductList />
          
          {/* Modal del carrito */}
          <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
