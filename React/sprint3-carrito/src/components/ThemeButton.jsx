import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "@phosphor-icons/react";

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
    >
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
};

export default ThemeButton;
