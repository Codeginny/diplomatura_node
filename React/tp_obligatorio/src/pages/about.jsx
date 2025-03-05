import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, StarFill, Star } from "react-bootstrap-icons";
import NavBar from "../components/navBar"; 
import Footer from "../components/footer"; 

const About = () => {

  const [estrellaRellena, setEstrellaRellena] = useState(false);

  const alternarEstrella = () => {
    setEstrellaRellena(!estrellaRellena);
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-200 via-pink-300 to-pink-400">
      {/* NavBar */}
      <NavBar /> {/* navBar al inicio */}

      {/* Contenido Principal */}
      <div className="flex flex-col items-center justify-center flex-grow">
        {/* Título de la página */}
        <motion.h2 
          className="text-4xl font-bold text-fuchsia-600 mb-8 mt-10 font-lilita"
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5 }}
        >
          ¿Quiénes Somos?
        </motion.h2>

        {/* Sección de Misión y Valores */}
        <div className="flex flex-col items-center w-full max-w-3xl px-4 space-y-6">
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <p className="text-xl text-gray-700">
              En <span className="font-bold text-fuchsia-600">Sweet Donuts</span>, nos dedicamos a ofrecer las donas más frescas y deliciosas, elaboradas con los mejores ingredientes para que disfrutes de una experiencia única en cada bocado.
            </p>
          </motion.div>

          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-gray-600">
              Nuestro compromiso es brindarte un sabor auténtico, con variedad de opciones y siempre con el toque de amor que nos caracteriza.
            </p>
          </motion.div>

          {/* Iconos de Valores */}
          <div className="flex space-x-6 text-fuchsia-600">
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <Heart size={48} />
              <p className="mt-2 text-xl font-semibold">Pasión</p>
            </motion.div>

            <motion.div 
              className="flex flex-col items-center cursor-pointer"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              onClick={alternarEstrella} // para cambiar la estrella
            >
              {/* Si estrellaRellena es true, muestra StarFill, si es false, muestra Star */}
              {estrellaRellena ? <StarFill size={48} /> : <Star size={48} />}
              <p className="mt-2 text-xl font-semibold">Calidad</p>
            </motion.div>
          </div>
        </div>

        {/* Imagen Representativa con animacion */}
        <motion.div 
          className="mt-0 mb-0 mx-auto"
          initial={{ opacity: 1, y: 0 }} 
          animate={{ y: [0, 20, 0] }}  // Mueve la imagen hacia arriba y abajo
          transition={{
            duration: 2,        // Duración del ciclo completo
            repeat: Infinity,   // Repite infinitamente
            repeatType: "loop", // Vuelve al inicio después de cada ciclo
            ease: "easeInOut"   // Suaviza la animación
          }}
        >
          <img src="/donut-4.png" alt="Donut 3" className="w-4/5 max-w-xl mx-auto" />
        </motion.div>

        {/* Llamado a la acción */}
        <motion.div 
          className="mt-1"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl text-white">
            Ven y descubre por qué somos los mejores en la creación de donas. ¡Te esperamos con los brazos abiertos!
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer /> {/* Footer */}
    </div>
  );
};

export default About;
