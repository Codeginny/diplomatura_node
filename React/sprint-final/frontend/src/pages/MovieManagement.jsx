import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { toast } from "react-toastify";

const MovieManagement = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const res = await api.get("/movies");
      setMovies(res.data);
    } catch (error) {
      toast.error("Error al obtener películas");
    }
  };

  const deleteMovie = async (id) => {
    try {
      await api.delete(`/movies/${id}`);
      toast.success("Película eliminada");
      fetchMovies();
    } catch (error) {
      toast.error("Error al eliminar película");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-2xl font-bold text-red-600 mb-6">Gestión de Películas</h2>

      <div className="bg-gray-900 p-4 rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id} className="border-b border-gray-700">
                <td>{movie.title}</td>
                <td>{movie.category}</td>
                <td>
                  <button
                    onClick={() => deleteMovie(movie._id)}
                    className="bg-red-600 px-4 py-2 rounded-md mr-2"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieManagement;
