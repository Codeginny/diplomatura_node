import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Asegúrate de que la ruta al modelo 'User' sea correcta

// Middleware para proteger rutas verificando el token JWT
export const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Se obtiene el token del header Authorization
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verifica la validez del token
    console.log("Token decodificado:", decoded);  // Aquí verificamos qué contiene el payload del token
    req.user = decoded;  // Asigna el payload del token al objeto `req.user` para su uso posterior
    next();  // Continúa con la siguiente función de middleware o la ruta
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });  // Error en la verificación del token
  }
};



// Middleware para verificar si el usuario es administrador
export const admin = async (req, res, next) => {
  try {
    // Aquí asumimos que req.user contiene la información del usuario autenticado
    const user = await User.findById(req.user.id); // Asegúrate de que el modelo User tiene el campo 'role'
    
    if (user?.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. You are not an admin.' });
    }
    
    next();  // Continúa si el usuario es admin
  } catch (error) {
    res.status(500).json({ message: 'Error verifying admin role', error: error.message });
  }
};