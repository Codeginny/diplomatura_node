// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';  // Usamos 'react-dom/client' en React 18
import App from './App';  // Importa el componente principal App.jsx
import './styles/index.css';  // Asegúrate de que el archivo de estilos esté correctamente importado

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
