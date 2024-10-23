import mongoose from 'mongoose';
import { logger } from '../utils/logger.mjs';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    logger.info('Conectado a la base de datos');
  } catch (error) {
    logger.error(`Error al conectar a la base de datos: ${error.message}`);
    process.exit(1);
  }
};
