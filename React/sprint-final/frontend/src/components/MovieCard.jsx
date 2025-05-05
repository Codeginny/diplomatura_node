import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <div
      onClick={handleMovieClick}
      className="cursor-pointer bg-neutral-800 p-4 rounded-xl hover:bg-red-700 transition"
    >
      <img
        src={movie.poster || "/default-poster.png"}
        alt={movie.title}
        className="rounded-xl w-full h-48 object-cover mb-2"
      />
      <h3 className="text-center text-lg font-bold">{movie.title}</h3>
    </div>
  );
}
