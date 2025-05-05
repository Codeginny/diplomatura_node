import { useState, useEffect, useCallback } from "react";
import useAuth from "../auth/useAuth";
import axios from "../api/axios";
import { toast } from "react-toastify";
import MovieCard from "./MovieCard";

const Watchlist = () => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Utilizamos useCallback para memorizar la función y evitar que cambie entre renderizados
  const fetchWatchlist = useCallback(async () => {
    try {
      if (user) {
        const response = await axios.get(`/watchlist/${user._id}`);
        setWatchlist(response.data);
      } else {
        toast.error("Usuario no encontrado");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error al cargar la lista de seguimiento");
    } finally {
      setLoading(false);
    }
  }, [user]); // La función depende de 'user'

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Ahora incluimos fetchWatchlist como dependencia, pero no genera ciclo infinito
  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]); // Solo se ejecuta cuando fetchWatchlist cambia

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"} transition-all`}>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-red-600">Mi Watchlist</h1>
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
          {watchlist.length === 0 ? (
            <p>No hay películas en tu watchlist.</p>
          ) : (
            watchlist.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Watchlist;

