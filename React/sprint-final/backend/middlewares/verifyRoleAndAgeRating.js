// middlewares/verifyRoleAndAgeRating.js

import User from "../models/User.js";  // Asegúrate de importar el modelo User

// Middleware para verificar el rol y la clasificación de la película
const verifyRoleAndAgeRating = async (req, res, next) => {
  try {
    // Obtenemos al usuario y populamos la propiedad 'role' para obtener su nombre
    const user = await User.findById(req.user.id).populate("role");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Obtenemos el nombre del rol
    const userRole = user.role.name;
    // Obtenemos la clasificación de edad de la película desde la query
    const movieAgeRating = req.query.ageRating || "";

    // Verificamos si el usuario tiene el rol de 'niño' y la película tiene clasificación '+18'
    if (userRole === "niño" && movieAgeRating === "+18") {
      return res.status(403).json({
        message: "Acceso denegado. Los niños solo pueden ver películas de clasificación ATP.",
      });
    }

    // Si la validación pasa, continuamos con el siguiente middleware o ruta
    next();
  } catch (error) {
    console.error("Error en verifyRoleAndAgeRating:", error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export default verifyRoleAndAgeRating;
