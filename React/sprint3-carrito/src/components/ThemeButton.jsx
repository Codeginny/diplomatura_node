// src/components/ThemeButton.jsx
import React from "react";
import { Sun, Moon } from "@phosphor-icons/react"; 
import { useTheme } from "../hooks/useTheme"; 

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme(); 

  return (
    <button onClick={toggleTheme} className="p-2 rounded-full">
      {theme === "dark" ? (
        <Sun size={24} className="text-yellow-500" /> 
      ) : (
        <Moon size={24} className="text-blue-500" /> 
      )}
    </button>
  );
};

export default ThemeButton;
