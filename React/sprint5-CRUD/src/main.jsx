import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { SuperHeroProvider } from './context/SuperHeroContext'; // Cambiado a SuperHeroProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SuperHeroProvider> {/* El Provider envuelve a toda la app */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SuperHeroProvider>
  </React.StrictMode>
);

