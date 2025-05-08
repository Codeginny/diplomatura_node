// backend/routes/userRoutes.js
import express from 'express';
import * as userCtrl from '../controllers/userController.js';
import { auth, admin } from '../middlewares/auth.js';

const router = express.Router();

// Rutas de autenticación
router.post('/register', userCtrl.register);  // Registrar un usuario
router.post('/login', userCtrl.login);        // Iniciar sesión

// Rutas de usuarios
router.get('/', auth, admin, userCtrl.getAllUsers);  // Solo admin puede obtener todos los usuarios
router.get('/me', auth, userCtrl.getUser);    // Obtener el usuario autenticado
router.put('/:id', auth, admin, userCtrl.updateUser); // Solo admin puede actualizar un usuario
router.delete('/:id', auth, admin, userCtrl.deleteUser); // Solo admin puede eliminar un usuario

export default router;
