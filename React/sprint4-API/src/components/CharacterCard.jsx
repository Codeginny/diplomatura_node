import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

const CharacterCard = ({ character }) => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4">
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold text-white">{character.name}</h2>
      <p className="text-gray-400 mt-2">Especie: {character.species}</p>
      <p className="text-gray-400">Estado: {character.status}</p>
      <p className="text-gray-400">Ubicación: {character.location.name}</p>

      <button
        onClick={() => {
          if (isFavorite) {
            removeFavorite(character.id);
          } else {
            addFavorite(character);
          }
        }}
        className={`px-4 py-2 rounded-md text-white ${
          isFavorite ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isFavorite ? "Eliminar de Favoritos" : "Agregar a Favoritos"}
      </button>
    </div>
  );
};

export default CharacterCard;
