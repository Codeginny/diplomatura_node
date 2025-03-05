import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapPin } from "react-icons/fa";
import NavBar from "../components/navBar"; 
import Footer from "../components/footer"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Campo: ${name}, Valor: ${value}`);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado con los siguientes datos:", formData);
    alert("¡Gracias por contactarnos!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-r from-pink-200 via-lime-100 to-lime-300 min-h-screen flex flex-col">
      {/* NavBar */}
      <NavBar />

      <div className="flex flex-col items-center justify-center flex-grow py-8">
        <motion.h2
          className="text-4xl font-bold text-white mb-4 font-lilita"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          ¡Contáctanos!
        </motion.h2>

        {/* Información de Contacto */}
        <div className="space-y-4 mb-8">
          <motion.div
            className="flex items-center space-x-2 text-lg text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaEnvelope size={24} color="white" />
            <p>contacto@sweetdonuts.com</p>
          </motion.div>

          <motion.div
            className="flex items-center space-x-2 text-lg text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <FaPhone size={24} color="white" />
            <p>(+54) 123 456 789</p>
          </motion.div>

          <motion.div
            className="flex items-center space-x-2 text-lg text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <FaMapPin size={24} color="white" />
            <p>Calle Ficticia 123, Córdoba, Argentina</p>
          </motion.div>
        </div>

        {/* Formulario de Contacto */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-white"
            >
              Nombre
            </label>
            <motion.input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              id="name"
              placeholder="Tu nombre"
              required
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              whileHover={{ scale: 1.05 }}
              whileFocus={{ borderColor: "#F472B6" }}
            />
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white"
            >
              Correo Electrónico
            </label>
            <motion.input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              placeholder="Tu correo electrónico"
              required
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              whileHover={{ scale: 1.05 }}
              whileFocus={{ borderColor: "#F472B6" }}
            />
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-white"
            >
              Mensaje
            </label>
            <motion.textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              id="message"
              placeholder="Escribe tu mensaje"
              required
              rows="4"
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              whileHover={{ scale: 1.05 }}
              whileFocus={{ borderColor: "#F472B6" }}
            />
          </motion.div>

          <motion.button
            type="submit"
            className="w-full px-6 py-3 mt-4 bg-green-500 text-white rounded-xl shadow-md hover:bg-green-600 transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
          >
            Enviar Mensaje
          </motion.button>
        </form>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;
