// routes/movieRoutes.js
import express from 'express';
import {
  createMovie,
  getMovies,
  updateMovie,
  deleteMovie,
  getFilteredMovies
} from '../controllers/movieController.js';
import { auth } from '../middlewares/auth.js';
import { isNiño, isAdulto } from '../middlewares/verifyRole.js';

const router = express.Router();

// CRUD
router.post('/', auth, isAdulto, createMovie); // Solo admin o adulto pueden crear películas
router.get('/', auth, (req, res, next) => {
  if (req.user.role === 'niño') {
    return isNiño(req, res, next);  // Solo películas ATP para niños
  }
  return isAdulto(req, res, next);  // Películas ATP y +18 para adultos
}, getMovies);  // Acceder al catálogo de películas

router.put('/:id', auth, isAdulto, updateMovie); // Solo adultos o admins pueden actualizar películas
router.delete('/:id', auth, isAdulto, deleteMovie); // Solo adultos o admins pueden eliminar películas

// Filtro por query string: ?category=Comedia&classification=ATP
router.get('/filter', auth, (req, res, next) => {
  if (req.user.role === 'niño') {
    return isNiño(req, res, next);  // Solo películas ATP para niños
  }
  return isAdulto(req, res, next);  // Películas ATP y +18 para adultos
}, getFilteredMovies);  // Aplicar filtros y obtener películas filtradas

export default router;
