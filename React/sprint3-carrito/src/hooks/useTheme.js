import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext"; // Asegúrate de importar el ThemeContext

// Hook personalizado para acceder al contexto del tema
export const useTheme = () => useContext(ThemeContext);
