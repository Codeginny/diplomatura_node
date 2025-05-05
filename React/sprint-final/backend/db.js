// backend/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Carga variables de entorno

mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('✅ Conexión exitosa a MongoDB Atlas desde db.js'))
.catch((error) => {
  console.error('❌ Error al conectar con MongoDB desde db.js:', error);
});
