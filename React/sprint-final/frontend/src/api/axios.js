// /src/api/axios.js
import axios from 'axios';

// Accede a la variable de entorno usando import.meta.env (para Vite con ESModules)
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Verifica si la URL base se está leyendo correctamente (opcional para depuración)
console.log(apiBaseUrl);

const api = axios.create({
  baseURL: apiBaseUrl, //  URL predeterminada
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token JWT en el header de cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // token del localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, la retornamos directamente
  async (error) => {
    const originalRequest = error.config;

    // Manejo de error de token expirado o no autorizado
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      window.location.href = '/login'; // Redirigir a login si el token expira
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;



