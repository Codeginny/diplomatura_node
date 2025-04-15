import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'; // Asegúrate de importar BrowserRouter
import './index.css'; // Tu archivo de estilos

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router> {/* Envolviendo App en BrowserRouter */}
    <App />
  </Router>
);
