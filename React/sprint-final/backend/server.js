// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js"; // Importa la conexión a la base de datos

// Rutas
import authRoutes from "./routes/auth.js";  
import userRoutes from "./routes/userRoutes.js";  
import profileRoutes from "./routes/profileRoutes.js";  
import movieRoutes from "./routes/movieRoutes.js";  

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a la base de datos
connectDB();  // Llama a la función de conexión

// Configuración de CORS
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Middleware para manejar JSON
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);  
app.use("/api/users", userRoutes);  
app.use("/api/profiles", profileRoutes);  
app.use("/api/movies", movieRoutes);  

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
