// routes/movieRoutes.js
import express from "express";
import { getMovies, getFilteredMovies } from "../controllers/movieController.js";
import { auth } from "../middlewares/auth.js";
import { isNiño, isAdulto } from "../middlewares/verifyRole.js";
import verifyRoleAndAgeRating from '../middlewares/verifyRoleAndAgeRating.js'; 

const router = express.Router();

// Ruta para obtener las películas con verificación de rol y clasificación
router.get('/movies', auth, verifyRoleAndAgeRating, getMovies);

// ✅ Ruta para obtener todas las películas (requiere autenticación)
router.get("/", auth, getMovies);

// ✅ Ruta para obtener películas filtradas
// Esta ruta verifica si el usuario es 'niño' o 'adulto' y aplica los filtros correspondientes
router.get("/filtered", auth, (req, res, next) => {
  const { role } = req.user;

  if (role === "niño") {
    return isNiño(req, res, next); // Solo ATP para niños
  }

  if (role === "adulto") {
    return isAdulto(req, res, next); // ATP y +18 para adultos
  }

  // Si el rol no es válido, se deniega el acceso
  return res.status(403).json({ message: "Acceso denegado" });
}, getFilteredMovies);

export default router;
