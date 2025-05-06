// src/pages/Home.jsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/authContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api } from '../api/axios';
import { FaStar } from 'react-icons/fa';

const Home = () => {
  const { auth } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get('/movies');
        setMovies(res.data);
      } catch (err) {
        console.error('Error al cargar películas:', err);
      }
    };
    fetchMovies();
  }, []);

  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {auth.user && <Header userProfile={auth.user.profile} />}
      
      {/* Banner */}
      <div className="relative w-full h-[60vh] bg-cover bg-center mb-8" style={{ backgroundImage: `url('/banner.jpg')` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-8">
          <h2 className="text-4xl font-bold">Película destacada</h2>
        </div>
      </div>

      {/* Películas */}
      <main className="px-8">
        <h1 className="text-2xl font-bold mb-6">Explora nuestras películas</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="relative group bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-400">{movie.category}</p>
                <p className="text-sm text-gray-400">{movie.ageRating}</p>
              </div>

              {/* Favoritos */}
              <button
                onClick={() => toggleFavorite(movie._id)}
                className="absolute top-3 right-3 text-yellow-400 text-xl z-10"
              >
                {favorites.includes(movie._id) && <FaStar />}
              </button>

              <button
                onClick={() => toggleFavorite(movie._id)}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-sm px-4 py-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                Favoritos
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
