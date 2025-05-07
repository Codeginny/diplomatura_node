// backend/server.js
import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv';
import './db.js';

// Rutas
import authRoutes from './routes/auth.js';  // Rutas de autenticación (registro y login)
import userRoutes from './routes/userRoutes.js';  // Rutas de usuario (ver y actualizar perfil)
import profileRoutes from './routes/profileRoutes.js';  // Rutas de perfiles
import movieRoutes from './routes/movieRoutes.js';  // Rutas de películas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:5173', '*'],  // La URL del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400
}));


// Middleware para manejar JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);  // Rutas de autenticación (registro y login)
app.use('/api/users', userRoutes);  // Rutas de usuario (ver y actualizar perfil)
app.use('/api/profiles', profileRoutes);  // Rutas para perfiles (como creación y gestión de perfiles)
app.use('/api/movies', movieRoutes);  // Rutas de películas (catalogo, CRUD, etc.)

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
