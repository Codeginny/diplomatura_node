import { useState, useEffect } from "react";
import axios from "../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Intentamos obtener las películas
        const res = await axios.get("/movies");
        setMovies(res.data);
      } catch (error) {
        // Mostramos un mensaje detallado en caso de error
        toast.error(error?.response?.data?.message || "Error al cargar películas");
      } finally {
        setLoading(false); // Siempre se ejecuta, incluso si hay un error
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold text-red-600 p-4">Catálogo de Películas</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="cursor-pointer bg-neutral-800 p-4 rounded-xl hover:bg-red-700 transition"
            onClick={() => handleMovieClick(movie._id)}
          >
            <img
              src={movie.poster || "/default-poster.jpg"}
              alt={movie.title}
              className="rounded-xl w-full h-auto"
            />
            <h3 className="text-center mt-2">{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
