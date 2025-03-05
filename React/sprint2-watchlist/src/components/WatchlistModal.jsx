import React from 'react';

const WatchlistModal = ({ isOpen, onClose, watchlist, onRemoveFromWatchlist }) => {
  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg p-6 relative w-full max-w-3xl max-h-[80vh] overflow-hidden">
        {/* Botón para cerrar el modal */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-black hover:text-red-600 text-2xl">
          &times;
        </button>
        
        {/* Título de la Watchlist */}
        <h2 className="text-black text-lg font-bold text-center mb-4">Mis Favoritos</h2>
        
        {/* Contenido de la Watchlist */}
        <div className="bg-white py-10 overflow-y-auto max-h-[65vh] px-4 space-y-4">
          {/* Si la Watchlist tiene películas, las mostramos */}
          {watchlist.length > 0 ? (
            watchlist.map((movie) => (
              <div 
                key={movie.id} 
                className="flex items-center bg-white rounded-lg shadow-md overflow-hidden p-4 space-x-4">
                <img 
                  src={movie.imgSrc} 
                  alt={movie.title} 
                  className="w-20 h-28 object-cover rounded-md" 
                />
                <div className="flex-1">
                  <h3 className="text-black text-lg font-bold">{movie.title}</h3>
                </div>
                <button 
                  onClick={() => onRemoveFromWatchlist(movie.id)} 
                  className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white py-2 px-4 rounded-md font-semibold transition-colors duration-300">
                  <i className="ph ph-trash"></i> Eliminar
                </button>
              </div>
            ))
          ) : (
            // Mensaje si no hay películas en la Watchlist
            <p className="text-black text-center">Aún no tienes películas en tus Favoritos.</p>
          )}
        </div>
        
        {/* Botón para cerrar el modal */}
        <button 
          onClick={onClose} 
          className="w-full mt-4 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default WatchlistModal;
