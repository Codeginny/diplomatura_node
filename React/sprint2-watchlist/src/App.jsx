import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import WatchlistModal from './components/WatchlistModal';

const App = () => {
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist"));
    return savedWatchlist || [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Guardar la watchlist en Local Storage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    setWatchlist((prevList) => {
      // Verificar si la película ya existe en la lista
      if (prevList.some((item) => item.id === movie.id)) {
        return prevList; // Si ya existe, no se agrega
      }
      const newList = [...prevList, movie];
      localStorage.setItem("watchlist", JSON.stringify(newList));
      return newList;
    });
  };
  

  const removeFromWatchlist = (movieId) => {
    setWatchlist((prevList) => {
      const updatedList = prevList.filter((movie) => movie.id !== movieId);
      localStorage.setItem("watchlist", JSON.stringify(updatedList));
      return updatedList;
    });
  };
  

  return (
    <div>
      <Header onOpenWatchlist={() => setIsModalOpen(true)} watchlist={watchlist} />
      <WatchlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        watchlist={watchlist}
        onRemoveFromWatchlist={removeFromWatchlist}
      />
      <Home onAddToWatchlist={addToWatchlist} watchlist={watchlist} />
    </div>
  );
};

export default App;
