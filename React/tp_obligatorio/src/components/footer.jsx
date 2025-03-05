import { useState } from "react";

const Footer = () => {
  // Estado para manejar el cambio de color
  const [fondoFucsia, setFondoFucsia] = useState(false);

  // Función para alternar el color del footer al hacer clic
  const alternarColorFooter = () => {
    setFondoFucsia(!fondoFucsia);
  };

  return (
    <footer 
      className={`text-center p-6 mt-10 w-full cursor-pointer transition-colors duration-300 
        ${fondoFucsia ? "bg-fuchsia-600 text-white" : "bg-white text-fuchsia-600"}`}
      onClick={alternarColorFooter} // Cambia el estado al hacer clic
    >
      {/* Frase final */}
      <p className="mb-4">¡Gracias por visitar Sweet Donuts, donde la dulzura se encuentra en cada bocado!</p>
      
      {/* Nombre */}
      <p>&copy; 2025 Sweet Donuts - Ponce Virginia Alejandra</p>
    </footer>
  );
};

export default Footer;
