import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-pink-300 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.h1 
          className="text-3xl font-bold text-white font-pacifico"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          🍩 Sweet Donuts
        </motion.h1>

        {/* Menú Desktop */}
        <ul className="hidden md:flex space-x-6 text-lg text-white">
          {["Inicio", "Nosotros", "Contacto"].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="cursor-pointer hover:text-fuchsia-500"
            >
              {item}
            </motion.li>
          ))}
        </ul>

        {/* Menú Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} color="white" /> : <Menu size={30} color="white" />}
          </button>
        </div>
      </div>

      {/* Menú Responsive */}
      {menuOpen && (
        <motion.ul 
          className="bg-pink-400 text-white text-lg space-y-4 p-4 mt-2 md:hidden"
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.3 }}
        >
          {["Inicio", "Nosotros", "Contacto"].map((item, index) => (
            <li key={index} className="cursor-pointer text-center">{item}</li>
          ))}
        </motion.ul>
      )}
    </nav>
  );
};

export default NavBar;
