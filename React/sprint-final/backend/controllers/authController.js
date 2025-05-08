// controllers/authController.js
import authService from '../services/authService.js';

// Función para registrar un nuevo usuario
export const registerUser = async (req, res) => {
    try {
        // Llamamos al servicio de autenticación para registrar al usuario
        const result = await authService.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error en el registro:", error.message);
        res.status(400).json({ message: error.message });
    }
};

// Función de login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Llamamos al servicio de autenticación para hacer login
        const result = await authService.login(email, password);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error en el login:", error.message);
        res.status(401).json({ message: error.message });
    }
};
