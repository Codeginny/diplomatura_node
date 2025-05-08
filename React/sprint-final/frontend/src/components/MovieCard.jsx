import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movie/${movie._id}`);
  };

  const getAgeRating = (rating) => {
    if (rating === "+18") {
      return "+18";
    }
    return "ATP";
  };

  return (
    <div
      className="cursor-pointer bg-neutral-800 p-4 rounded-xl hover:bg-red-700 transition w-full flex flex-col"
      onClick={handleMovieClick}
    >
      {/* Contenedor de la imagen */}
      <div className="relative w-full h-40"> {/* Ajuste de altura */}
        <img
          src={movie.poster || "/default-poster.jpg"}
          alt={movie.title}
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      {/* Contenedor del texto dentro del card */}
      <div className="mt-2 text-center">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-300">{movie.category}</p>
        <p className="text-sm text-gray-400">{getAgeRating(movie.ageRating)}</p>
      </div>
    </div>
  );
};

export default MovieCard;
