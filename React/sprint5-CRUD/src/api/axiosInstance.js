// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://680a8019d5075a76d98835ec.mockapi.io/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // tiempo máximo de espera
});

export default axiosInstance;
