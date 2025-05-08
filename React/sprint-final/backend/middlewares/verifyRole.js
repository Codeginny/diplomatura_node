// middlewares/verifyRole.js

// Middleware para verificar el rol del usuario
export const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (userRole !== requiredRole) {
      return res.status(403).json({ message: `Acceso denegado. Se requiere rol de ${requiredRole}.` });
    }

    next();
  };
};

// Middleware para verificar si el usuario es 'niño' (solo puede ver películas ATP)
export const isNiño = (req, res, next) => {
  if (req.user.role !== 'niño') {
    return res.status(403).json({ message: 'Acceso denegado. Solo para niños.' });
  }

  next();
};

// Middleware para verificar si el usuario es 'adulto' (puede ver películas ATP y +18)
export const isAdulto = (req, res, next) => {
  if (req.user.role !== 'adulto') {
    return res.status(403).json({ message: 'Acceso denegado. Solo para adultos.' });
  }

  next();
};
