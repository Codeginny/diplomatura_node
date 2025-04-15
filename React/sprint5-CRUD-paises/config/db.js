import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Grupo-04:grupo04@cursadanodejs.ls9ii.mongodb.net/Node-js', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // 30 segundos
    });
    console.log('Conexión a la base de datos establecida con éxito');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    // Mostrar un mensaje sin detener el proceso si no está en Node.js
    alert('Error de conexión con la base de datos. Por favor, intente nuevamente.');
  }
};