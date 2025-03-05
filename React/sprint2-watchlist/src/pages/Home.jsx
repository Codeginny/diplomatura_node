import React, { useState } from "react";
import { PlayCircle, Star } from "@phosphor-icons/react/dist/ssr";

const movies = [
  { id: 1, title: "La isla siniestra", imgSrc: "/assets/img/imagen_01.jpg" },
  { id: 2, title: "Eterno resplandor", imgSrc: "/assets/img/imagen_02.jpg" },
  { id: 3, title: "Avatar", imgSrc: "/assets/img/imagen_03.jpg" },
  { id: 4, title: "Fragmentado", imgSrc: "/assets/img/imagen_04.jpg" },
  { id: 5, title: "Una cuestión de tiempo", imgSrc: "/assets/img/imagen_05.jpg" }
];

const Home = ({ onAddToWatchlist, watchlist }) => {
  const [successMessage, setSuccessMessage] = useState("");

  const addToWatchlist = (movie) => {
    onAddToWatchlist(movie);
    setSuccessMessage(`"${movie.title}" agregado a favoritos`);
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      <section
        className="relative h-[80vh] flex items-center justify-center px-4 pb-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/img/imagen_06.jpg')` }}
      >
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-bold text-white drop-shadow-2xl">
            Películas y Series ilimitadas
          </h2>
          <p className="text-xl text-black-400 mt-4 drop-shadow-2xl">
            Disfruta en cualquier lugar. Cancela en cualquier momento.
          </p>
          <button className="mt-6 bg-red-600 text-white px-6 py-3 text-lg font-semibold rounded hover:bg-red-700 transition">
            Ver ahora
          </button>
        </div>
      </section>

      {/* Movie Grid */}
      <section className="p-4 mt-0 mb-0">
        <h2 className="text-3xl font-bold text-white mb-6">Populares</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => {
            const isFavorite = watchlist.some((item) => item.id === movie.id);
            return (
              <div key={movie.id} className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer">
                <img src={movie.imgSrc} alt={`${movie.title} - Poster`} className="w-full h-56 object-cover" />
                {/* Estrella fija en la imagen */}
                <div className="absolute top-2 left-2 text-white text-3xl">
                  {isFavorite ? <Star weight="fill" size={28} /> : <Star size={28} />}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition duration-300 p-4">
                  <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                  <div className="flex justify-between mt-2">
                    <button
                      onClick={() => addToWatchlist(movie)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center gap-2"
                    >
                      <Star size={20} /> Favorito
                    </button>
                    <button className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2">
                      <PlayCircle size={20} /> Play
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Home;
