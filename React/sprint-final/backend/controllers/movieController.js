// controllers/movieController.js
import Movie from '../models/Movie.js';

export const createMovie = async (req, res) => {
  const movie = await Movie.create(req.body);
  res.status(201).json(movie);
};

export const getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

export const updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(movie);
};

export const deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie deleted' });
};

// ✅ Nuevo método para filtrar por categoría y clasificación
export const getFilteredMovies = async (req, res) => {
  try {
    const { category, classification } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (classification) filters.classification = classification;

    const movies = await Movie.find(filters);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener películas filtradas' });
  }
};
