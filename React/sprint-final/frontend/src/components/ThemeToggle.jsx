// src/components/ThemeToggle.jsx
import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

// Exportar temas
export const lightTheme = {
  backgroundColor: '#f9f9f9',
  color: '#000',
  buttonBackground: '#ff0000',
  buttonHover: '#e60000',
  textColor: '#333',
};

export const darkTheme = {
  backgroundColor: '#121212',
  color: '#ffffff',
  buttonBackground: '#ff0000',
  buttonHover: '#e60000',
  textColor: '#bbb',
};

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-3 rounded-full transition-colors duration-300 ${darkMode ? 'bg-red-600 hover:bg-red-500' : 'bg-gray-200 hover:bg-gray-300'}`}
      aria-label="Toggle theme"
      title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {darkMode ? (
        <FaSun size={24} className="text-white" />
      ) : (
        <FaMoon size={24} className="text-black" />
      )}
    </button>
  );
};

export default ThemeToggle;
