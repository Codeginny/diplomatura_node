/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",         
    "./src/**/*.{js,jsx,ts,tsx}", // Archivos JSX y TSX en el directorio src
  ],
  darkMode: 'class',  // Habilita el modo oscuro basado en clases
  theme: {
    extend: {
      colors: {
        'tech-blue': '#007BFF',
        'tech-lightblue': '#00A8E8',
        'tech-dark': '#121212',
        'tech-light': '#F8F9FA',
        'tech-gray': '#B0BEC5',
      }
    }
  },
  plugins: [],
}
