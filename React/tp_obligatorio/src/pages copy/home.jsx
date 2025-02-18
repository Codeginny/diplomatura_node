import { useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [showText, setShowText] = useState(false);
  const donuts = [
    { id: 1, name: "Donut Clásica", color: "bg-pink-200" },
    { id: 2, name: "Donut Chocolate", color: "bg-fuchsia-400" },
    { id: 3, name: "Donut Vainilla", color: "bg-green-200" }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <motion.h2 
        className="text-4xl font-bold text-fuchsia-600 mb-4 font-lilita"
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
      >
        ¡Bienvenido a Sweet Donuts!
      </motion.h2>

      {/* Lista de Donas */}
      <div className="flex space-x-6">
        {donuts.map((donut) => (
          <motion.div 
            key={donut.id} 
            className={`w-40 h-40 flex items-center justify-center rounded-full ${donut.color} shadow-lg text-white font-bold`}
            whileHover={{ scale: 1.1 }}
          >
            {donut.name}
          </motion.div>
        ))}
      </div>

      {/* Botón interactivo */}
      <button 
        onClick={() => setShowText(!showText)} 
        className="mt-6 px-6 py-3 bg-fuchsia-500 text-white rounded-xl shadow-md hover:bg-fuchsia-700 transition"
      >
        {showText ? "Ocultar Info" : "Ver Más"}
      </button>

      {/* Renderizado Condicional */}
      {showText && (
        <motion.p 
          className="mt-4 text-lg text-gray-600"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          ¡Descubre el mejor sabor con nuestras donas artesanales!
        </motion.p>
      )}
    </div>
  );
};

export default Home;
