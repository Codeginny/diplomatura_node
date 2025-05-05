// middlewares/verifyRole.js

// Middleware para verificar el rol y la clasificación de edad
export const verifyRoleAndAgeRating = (requiredRole, requiredAgeRating) => {
  return (req, res, next) => {
    const userRole = req.user.role  // El rol del usuario está en req.user, asignado por el middleware 'auth'
    const movieAgeRating = req.query.ageRating  // Recibe el filtro de clasificación de edad desde los parámetros de la solicitud

    // Verifica si el rol del usuario coincide con el rol requerido
    if (userRole !== requiredRole) {
      return res.status(403).json({ message: `Acceso denegado. Se requiere rol de ${requiredRole}.` })
    }

    // Verifica si el usuario tiene el rol 'niño' y si la clasificación de la película es '+18'
    if (userRole === 'niño' && movieAgeRating === '+18') {
      return res.status(403).json({ message: 'Acceso denegado. Los niños solo pueden ver películas de clasificación ATP.' })
    }

    // Si se especifica un requiredAgeRating, compara con la clasificación de edad de la película
    if (requiredAgeRating && movieAgeRating !== requiredAgeRating) {
      return res.status(403).json({ message: `Acceso denegado. El filtro de edad debe ser ${requiredAgeRating} para este rol.` })
    }

    // Si todo está correcto, pasa al siguiente middleware o la ruta
    next()
  }
}

// Middleware para verificar si el usuario es 'niño' (solo puede ver películas ATP)
export const isNiño = (req, res, next) => {
  return verifyRoleAndAgeRating('niño', 'ATP')(req, res, next)
}

// Middleware para verificar si el usuario es 'adulto' (puede ver películas ATP y +18)
export const isAdulto = (req, res, next) => {
  return verifyRoleAndAgeRating('adulto', null)(req, res, next)
}
