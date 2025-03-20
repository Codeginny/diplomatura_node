// src/components/ThemeButton.jsx
import React from "react";
import { Sun, Moon } from "@phosphor-icons/react"; // Importamos los íconos de sol y luna
import { useTheme } from "../hooks/useTheme"; // Usamos el hook de tema

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme(); // Usamos el hook para obtener y cambiar el tema

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full">
      {theme === "dark" ? (
        <Sun size={24} className="text-yellow-500" /> // Icono de sol en el modo oscuro
      ) : (
        <Moon size={24} className="text-blue-500" /> // Icono de luna en el modo claro
      )}
    </button>
  );
};

export default ThemeButton;
