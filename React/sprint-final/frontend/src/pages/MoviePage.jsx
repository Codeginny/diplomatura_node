import { useState, useEffect } from "react";
import { api } from "../api/axios";
import { toast } from "react-toastify";
import MovieCard from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/authContext"; // Importamos el contexto
import headerBanner from "../assets/img/header.jpg";

const MoviePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext); // Accedemos al contexto de autenticación
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error al cargar películas");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filtrar las películas dependiendo del perfil
  const filteredMovies = auth.profile === "niño"
    ? movies.filter(movie => movie.ageRating === "ATP") // Si el perfil es niño, solo películas ATP
    : movies; // Si el perfil es adulto, todas las películas

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Banner debajo del header */}
      <img src={headerBanner} alt="header-banner" className="w-full h-auto" />


      {/* Sección de Películas destacadas */}
      <h2 className="text-2xl font-bold text-red-600 p-4">Películas destacadas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {filteredMovies.slice(0, 4).map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {/* Sección de Películas recomendadas */}
      <h2 className="text-2xl font-bold text-red-600 p-4">Películas recomendadas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {filteredMovies.slice(4, 8).map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {/* Sección de Películas favoritas */}
      <h2 className="text-2xl font-bold text-red-600 p-4">Películas favoritas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {filteredMovies.slice(8, 12).map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      {/* Sección de Catálogo de películas */}
      <h2 className="text-2xl font-bold text-red-600 p-4">Catálogo de películas</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
