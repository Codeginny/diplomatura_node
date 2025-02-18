import { motion } from "framer-motion";
import { Heart, Star } from "react-bootstrap-icons";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Título de la página */}
      <motion.h2 
        className="text-4xl font-bold text-fuchsia-600 mb-8 font-lilita"
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
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Star size={48} />
            <p className="mt-2 text-xl font-semibold">Calidad</p>
          </motion.div>
        </div>
      </div>

      {/* Imagen Representativa */}
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <img 
          src="https://via.placeholder.com/600x400" 
          alt="Imagen de donas"
          className="w-full max-w-xl rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Llamado a la acción */}
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <p className="text-xl text-gray-600">
          Ven y descubre por qué somos los mejores en la creación de donas. ¡Te esperamos con los brazos abiertos!
        </p>
      </motion.div>
    </div>
  );
};

export default About;
