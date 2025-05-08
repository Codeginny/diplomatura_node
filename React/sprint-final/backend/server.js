import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv';
import './db.js';

// Rutas
import authRoutes from './routes/auth.js';  
import userRoutes from './routes/userRoutes.js';  
import profileRoutes from './routes/profileRoutes.js';  
import movieRoutes from './routes/movieRoutes.js';  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400,
}));

// Middleware para manejar JSON
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);  
app.use('/api/users', userRoutes);  
app.use('/api/profiles', profileRoutes);  
app.use('/api/movies', movieRoutes);  

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
