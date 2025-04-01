import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext'; // Asegúrate de que esto sea correcto

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  // Verificar si favorites es un array antes de hacer map
  const favoriteList = Array.isArray(favorites) ? favorites : [];

  return (
    <div className="favorites-container">
      {favoriteList.length > 0 ? (
        favoriteList.map((character) => (
          <div key={character.id} className="favorite-item">
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
          </div>
        ))
      ) : (
        <p>No tienes personajes favoritos.</p>
      )}
    </div>
  );
};

export default Favorites;
