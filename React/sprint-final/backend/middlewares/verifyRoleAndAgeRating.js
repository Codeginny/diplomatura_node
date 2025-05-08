// middlewares/verifyRoleAndAgeRating.js

// Middleware para verificar el rol y la clasificación de la película
const verifyRoleAndAgeRating = (req, res, next) => {
    const userRole = req.user?.role;  // El rol del usuario debe estar en req.user (extraído del token)
    const movieAgeRating = req.query.ageRating || '';  // Usamos una cadena vacía si no se pasa ageRating en la solicitud
  
    // Verifica si el usuario es un 'niño' y si la clasificación de la película es '+18'
    if (userRole === 'niño' && movieAgeRating === '+18') {
      return res.status(403).json({ message: 'Acceso denegado. Los niños solo pueden ver películas de clasificación ATP.' });
    }
  
    // Continúa con el siguiente middleware o ruta
    next();
  };
  
  export default verifyRoleAndAgeRating;
  