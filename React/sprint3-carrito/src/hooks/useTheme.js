import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Estado para el tema

  // Función para alternar entre los modos
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme); // Guardar el tema en localStorage
  };

  // Efecto para agregar la clase 'dark' al body cuando el tema sea dark
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]); // Dependencia de 'theme'

  return { theme, toggleTheme }; // Devuelve el tema y la función para alternarlo
};
