// middlewares/auth.js
import jwt from 'jsonwebtoken'

// Middleware para proteger rutas verificando el token JWT
export const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]  // Se obtiene el token del header Authorization
  if (!token) return res.status(401).json({ message: 'No token provided' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)  // Verifica la validez del token
    req.user = decoded  // Asigna el payload del token al objeto `req.user` para su uso posterior
    next()  // Continúa con la siguiente función de middleware o la ruta
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message })  // Error en la verificación del token
  }
}

// Middleware para verificar si el usuario tiene rol de admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {  // Verifica si el rol del usuario es 'admin'
    return res.status(403).json({ message: 'Forbidden: Admins only' })  // Acceso denegado si no es admin
  }
  next()  // Continúa si el usuario tiene rol de admin
}
