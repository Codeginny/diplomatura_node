// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log("✅ Conectado a la base de datos");
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error.message);
    process.exit(1); // Detiene el servidor si no se conecta a la DB
  }
};

export default connectDB;
