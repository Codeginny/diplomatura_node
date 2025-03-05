import React from 'react';

const MovieCard = ({ title, imgSrc, onAddToWatchlist }) => {
  return (
    <div className="bg-dark-secondary rounded-lg shadow-lg overflow-hidden">
      <img src={imgSrc} alt={title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-text-primary text-lg text-center font-bold mb-2">{title}</h2>
        <button 
          onClick={onAddToWatchlist}
          className="bg-button-primary hover:bg-button-primary-hover active:bg-button-primary-active text-dark-secondary py-2 px-4 rounded-md w-full font-semibold transition-colors duration-300">
          <i className="ph ph-plus"></i> Agregar a favoritos
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
