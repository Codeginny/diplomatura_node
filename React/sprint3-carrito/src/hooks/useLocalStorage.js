import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  // Intenta obtener el valor del localStorage
  const storedValue = localStorage.getItem(key);

  // Verifica si storedValue existe y si es un JSON válido
  let parsedValue;

  try {
    parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;
  } catch (error) {
    console.error("Error parsing JSON from localStorage", error);
    parsedValue = initialValue; // Si el parseo falla, usamos el valor inicial
  }

  const [value, setValue] = useState(parsedValue);

  const setStoredValue = (newValue) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  };

  return [value, setStoredValue];
};
