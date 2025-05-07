import { useState, useEffect } from "react";
import { instance } from '../api/axios'; 
import { toast } from "react-toastify";
import MovieCard from "./MovieCard";
import useAuth from "../auth/useAuth";

export default function MovieCatalog() {
  const { auth } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await instance.get("/movies"); // ✅ aquí se usa `instance`
      setMovies(response.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error al cargar películas";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (user) {
      fetchMovies();
    }
  }, [user]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"} transition-all`}>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-red-600">Catálogo de Películas</h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <p>Cargando...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
