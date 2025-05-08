// src/api/axios.js
import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

console.log('[Axios] API base URL:', apiBaseUrl);

// Instancia sin token (para login, registro, etc.)
const instance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Instancia con token automático para rutas protegidas
const api = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token JWT en las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar respuestas y guardar token + usuario
api.interceptors.response.use(
  (response) => {
    // Si la respuesta es del login, guarda el token y el usuario
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      window.location.href = '/login';  // Redirigir al login si el token ha expirado
    } else if (error.response && error.response.status === 403) {
      // Agregar un manejo de error para acceso no permitido
      alert('Acceso denegado. No tienes permisos suficientes.');
    }

    return Promise.reject(error);
  }
);

// Exporta ambas instancias
export { api, instance };
