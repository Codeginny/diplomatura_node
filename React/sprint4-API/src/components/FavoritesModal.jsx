// src/components/FavoritesModal.jsx
import React from "react";

const FavoritesModal = ({ isOpen, onClose, favorites, onRemove }) => {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg p-6 relative w-full max-w-3xl max-h-[80vh] overflow-hidden">
        {/* Botón de la X */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-black hover:text-red-600 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-black text-lg font-bold text-center mb-4">Mis Favoritos</h2>
        
        <div className="overflow-y-auto max-h-[65vh] space-y-4">
          {favorites.length > 0 ? (
            favorites.map((character) => (
              <div key={character.id} className="flex items-center bg-white rounded-lg shadow-md p-4 space-x-4">
                <img 
                  src={character.image} 
                  alt={character.name} 
                  className="w-20 h-20 object-cover rounded-md" 
                />
                <div className="flex-1">
                  <h3 className="text-black text-lg font-bold">{character.name}</h3>
                  <p className="text-gray-700">Especie: {character.species}</p>
                </div>
                <button 
                  onClick={() => onRemove(character.id)} 
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition"
                >
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <p className="text-black text-center">No hay personajes favoritos.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesModal;

