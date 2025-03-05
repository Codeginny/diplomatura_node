import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Cart } from "react-bootstrap-icons";
import Link from "next/link";
import NavBar from "../components/navBar";
import Footer from "../components/footer";

const Index = () => {
  const [showDiscount, setShowDiscount] = useState(false);

  const toggleDiscount = () => setShowDiscount(!showDiscount);

  return (
    <div className="bg-gradient-to-r from-pink-300 via-fuchsia-300 to-purple-300 min-h-screen flex flex-col">
      {/* Navbar */}
      <NavBar />

      {/* Contenido principal */}
      <main className="flex-grow flex flex-col items-center justify-center">
        {/* Hero Section */}
        <motion.section
          className="text-center pt-16 px-6 md:px-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white font-lilita mb-4">Bienvenidos a Sweet Donuts</h1>
          <p className="text-xl text-white mb-6">Las mejores donas artesanales, frescas y deliciosas. ¡Disfruta de un sabor único!</p>
          <button
            onClick={toggleDiscount}
            className="px-8 py-3 bg-fuchsia-500 text-white rounded-full hover:bg-fuchsia-600 transition duration-300"
          >
            {showDiscount ? "Ocultar Oferta Especial" : "Ver Oferta Especial"}
          </button>
        </motion.section>

        {/* Oferta Especial */}
        {showDiscount && (
          <motion.div
            className="bg-white rounded-lg p-6 mt-6 max-w-md text-center shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-bold text-fuchsia-600">¡Descuento Especial!</h3>
            <p className="text-gray-600 mt-2">Obtén un 20% de descuento en tu primera compra. ¡No te lo pierdas!</p>
          </motion.div>
        )}

        {/* Productos Destacados */}
        <motion.section
          className="mt-12 w-full text-center bg-gradient-full" /* Aplica el fondo completo en todas las pantallas */
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-white mb-8 font-lilita">Nuestros Productos</h2>
          <div className="grid-container"> {/* Clase actualizada para el grid */}
            {/* Producto 1 */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src="/donut-1.png" alt="Donut 1" className="rounded-lg mb-4" />
              <h3 className="text-2xl font-semibold text-fuchsia-600">Donut Clásica</h3>
              <p className="text-gray-600 mb-4">La clásica donut de vainilla y chocolate, con un topping de frutilla.</p>
              <button className="flex items-center justify-center bg-fuchsia-500 text-white rounded-full py-2 px-6 mt-2 hover:bg-fuchsia-600 transition duration-300">
                <Cart size={20} className="mr-2" />
                Ver producto
              </button>
            </div>

            {/* Producto 2 */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src="/donut-2.png" alt="Donut 2" className="rounded-lg mb-4" />
              <h3 className="text-2xl font-semibold text-fuchsia-600">Donut de Frutilla</h3>
              <p className="text-gray-600 mb-4">Donut rellena de crema de frutilla con topping de frutas frescas.</p>
              <button className="flex items-center justify-center bg-fuchsia-500 text-white rounded-full py-2 px-6 mt-2 hover:bg-fuchsia-600 transition duration-300">
                <Cart size={20} className="mr-2" />
                Ver producto
              </button>
            </div>

            {/* Producto 3 */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src="/donut-3.png" alt="Donut 3" className="rounded-lg mb-4" />
              <h3 className="text-2xl font-semibold text-fuchsia-600">Donut de Chocolate</h3>
              <p className="text-gray-600 mb-4">Deliciosa donut de chocolate con cobertura de dulce de leche.</p>
              <button className="flex items-center justify-center bg-fuchsia-500 text-white rounded-full py-2 px-6 mt-2 hover:bg-fuchsia-600 transition duration-300">
                <Cart size={20} className="mr-2" />
                Ver producto
              </button>
            </div>
          </div>
        </motion.section>

          {/* Llamado a la Acción */}
          <motion.section
          className="mt-1 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 font-lilita">¡Haz tu pedido ahora!</h2>
          <Link href="/contact" className="px-8 py-3 bg-green-400 text-white rounded-full hover:bg-green-500 transition duration-300">
            Contáctanos
          </Link>
        </motion.section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
