import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc'; // Usando react-swc para la configuración de React

export default defineConfig({
  root: './', // Establece la raíz del proyecto
  plugins: [react()], // Usamos el plugin de react-swc
  css: {
    postcss: './postcss.config.js', // Asegúrate de que esta ruta esté correcta
  },
});
