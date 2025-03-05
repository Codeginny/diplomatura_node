import React from 'react';

const Header = ({ onOpenWatchlist }) => {
  return (
    <header className="bg-dark-secondary py-4 px-6 flex justify-between items-center">
      <img 
        src="/assets/img/logo.png" 
        alt="NODO Movies Logo" 
        className="h-10"
      />
      <div className="flex items-center space-x-4">
        <button 
          onClick={onOpenWatchlist}  // Llama a la función para abrir el modal
          className="text-text-primary text-xl font-semibold hover:text-accent-teal transition-colors duration-300">
          Favoritos
        </button>
        <i className="ph ph-user-circle text-4xl text-accent-teal hover:text-button-primary-hover cursor-pointer"></i>
      </div>
    </header>
  );
};

export default Header;