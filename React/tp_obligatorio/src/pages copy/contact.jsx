import { useState } from "react";
import { motion } from "framer-motion";
import { Envelope, Phone, MapPin } from "react-bootstrap-icons";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Gracias por contactarnos!");
    // Aquí iría la lógica para enviar el formulario, por ejemplo, con fetch o axios
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <motion.h2 
        className="text-4xl font-bold text-fuchsia-600 mb-4 font-lilita"
        initial={{ opacity: 0, scale: 0.8 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
      >
        ¡Contáctanos!
      </motion.h2>

      <div className="flex flex-col items-center space-y-6 w-full max-w-lg px-4">
        {/* Información de Contacto */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-lg text-gray-700">
            <Envelope size={24} color="#f472b6" />
            <p>contacto@sweetdonuts.com</p>
          </div>
          <div className="flex items-center space-x-2 text-lg text-gray-700">
            <Phone size={24} color="#f472b6" />
            <p>(+54) 123 456 789</p>
          </div>
          <div className="flex items-center space-x-2 text-lg text-gray-700">
            <MapPin size={24} color="#f472b6" />
            <p>Calle Ficticia 123, Córdoba, Argentina</p>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="name" className="block text-sm font-semibold text-gray-600">Nombre</label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              id="name"
              placeholder="Tu nombre"
              required
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
          </motion.div>

          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Correo Electrónico</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              placeholder="Tu correo electrónico"
              required
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
          </motion.div>

          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
          >
            <label htmlFor="message" className="block text-sm font-semibold text-gray-600">Mensaje</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              id="message"
              placeholder="Escribe tu mensaje"
              required
              rows="4"
              className="w-full p-3 mt-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
            />
          </motion.div>

          <motion.button 
            type="submit"
            className="w-full px-6 py-3 mt-4 bg-fuchsia-500 text-white rounded-xl shadow-md hover:bg-fuchsia-700 transition"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.3 }}
          >
            Enviar Mensaje
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
