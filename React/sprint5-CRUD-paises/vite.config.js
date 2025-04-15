import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: './', // Establece la raíz del proyecto
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
})
