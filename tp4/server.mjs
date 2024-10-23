import express from 'express';
import superheroRoutes from './routes/superheroRoutes.mjs';
import { connectDB } from './config/dbConfig.mjs';
import { logger } from './utils/logger.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/superheroes', superheroRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  logger.info(`Servidor ejecutándose en el puerto ${PORT}`);
});
