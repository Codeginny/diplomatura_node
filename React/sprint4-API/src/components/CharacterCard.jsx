import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

const CharacterCard = ({ character }) => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-4 relative">
        {/* Estrella verde sobre la imagen cuando es favorito */}
        {isFavorite && (
          <span className="absolute top-6 left-6 text-green-500 text-3xl z-10">★</span> 
        )}

        {/* Contenedor para la imagen (proporción 1:1) */}
        <div className="w-full h-64 relative">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover rounded-md mb-4"
          />
        </div>

        {/* Nombre del personaje */}
        <h2 className="text-xl font-semibold text-white text-center">{character.name}</h2>

        {/* Detalles del personaje con emojis */}
        <p className="text-gray-400 mt-2 flex items-center justify-start">
          <span className="mr-2">🦸‍♂️</span> Especie: {character.species}
        </p>
        <p className="text-gray-400 flex items-center justify-start">
          <span className="mr-2 text-red-500 text-lg underline">💯</span> Estado: {character.status}
        </p>
        <p className="text-gray-400 flex items-center justify-start">
          <span className="mr-2">🌍</span> Ubicación: {character.location.name}
        </p>

        {/* Botón para agregar o eliminar de favoritos */}
        <button
          onClick={() => {
            if (isFavorite) {
              removeFavorite(character.id);
            } else {
              addFavorite(character);
            }
          }}
          className={`w-full mt-4 px-4 py-2 rounded-md text-white ${
            isFavorite ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isFavorite ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;



