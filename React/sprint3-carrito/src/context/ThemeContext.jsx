import { createContext, useState, useEffect } from "react";

// Crea el contexto para el tema
const ThemeContext = createContext();

// El proveedor del tema
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"; // Obtén el tema desde localStorage o usa 'light' por defecto
  });

  useEffect(() => {
    // Guarda el tema seleccionado en localStorage y cambia la clase de la raíz
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme; // Cambia la clase del body o html
  }, [theme]);

  // Cambia entre el modo claro y oscuro
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
