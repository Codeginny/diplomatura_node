// src/pages/AdminPage.jsx
import { useState, useEffect } from "react";
import { api } from "../api/axios";  // Asegúrate de que la importación esté correcta
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies"); // Asegúrate de que tu endpoint esté correcto
        setMovies(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error al cargar películas");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleEditMovie = (movieId) => {
    navigate(`/admin/movie/edit/${movieId}`);
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      const res = await api.delete(`/movies/${movieId}`);
      if (res.status === 200) {
        setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
        toast.success("Película eliminada correctamente");
      } else {
        toast.error("No se pudo eliminar la película");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error al eliminar película");
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-3xl font-bold text-red-600 p-4">Panel de Administración</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-neutral-800 p-4 rounded-xl">
            <img
              src={movie.poster || "/default-poster.jpg"}
              alt={movie.title}
              className="rounded-xl w-full h-auto"
            />
            <h3 className="text-center mt-2">{movie.title}</h3>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEditMovie(movie._id)}
                className="bg-yellow-500 text-black px-4 py-2 rounded-md"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteMovie(movie._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
