// routes/userRoutes.js
import express from 'express';
import * as userCtrl from '../controllers/userController.js';
import { auth } from '../middlewares/auth.js';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/register', registerUser);  // Usar /register
router.post('/login', loginUser);        // Usar /login

// Rutas de usuario
router.get('/me', auth, userCtrl.getUser);
router.put('/me', auth, userCtrl.updateUser);
router.delete('/me', auth, userCtrl.deleteUser);

export default router;
