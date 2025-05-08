// controllers/movieController.js
import Movie from "../models/Movie.js";

// Obtener todas las películas sin restricciones
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener las películas" });
  }
};

// Obtener películas filtradas según categoría o clasificación de edad
export const getFilteredMovies = async (req, res) => {
  try {
    const { category, ageRating } = req.query;
    const userRole = req.user.role;

    const filters = {};

    // Filtro por categoría si está presente
    if (category) {
      filters.category = category;
    }

    // Filtro por clasificación de edad
    if (userRole === "niño") {
      filters.ageRating = "ATP"; // Solo películas para niños
    } else if (userRole === "adulto") {
      // Si se especifica un ageRating, se respeta. De lo contrario, se permiten ambos.
      filters.ageRating = ageRating ? ageRating : { $in: ["ATP", "+18"] }; // Permitir tanto ATP como +18 para adultos
    }

    const movies = await Movie.find(filters);
    res.json(movies);

  } catch (error) {
    console.error("Error al obtener películas filtradas:", error.message);
    res.status(500).json({ message: "Error al obtener películas filtradas" });
  }
};
