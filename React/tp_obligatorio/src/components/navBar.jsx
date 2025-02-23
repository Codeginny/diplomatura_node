import { useState } from "react";
import { motion } from "framer-motion";
import { List, X } from "react-bootstrap-icons";
import Link from "next/link";  // Importamos Link para navegar entre páginas


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
          {["Inicio", "Nosotros", "Contacto"].map((item, index) => {
            let route;
            // Definir la ruta para cada item
            if (item === "Inicio") {
              route = "/";
            } else if (item === "Nosotros") {
              route = "/about";
            } else if (item === "Contacto") {
              route = "/contact";
            }
            
            return (
              <motion.li
                key={index}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="cursor-pointer hover:text-fuchsia-500"
              >
                <Link href={route}>
                  {item}
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* Menú Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} color="white" /> : <List size={30} color="white" />}
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
          {["Inicio", "Nosotros", "Contacto"].map((item, index) => {
            const route = item === "Inicio" ? "/" : item === "Nosotros" ? "/about" : "/contact";
            return (
              <li key={index} className="cursor-pointer text-center">
                <Link href={route}>
                  {item}
                </Link>
              </li>
            );
          })}
        </motion.ul>
      )}
    </nav>
  );
};

export default NavBar;
