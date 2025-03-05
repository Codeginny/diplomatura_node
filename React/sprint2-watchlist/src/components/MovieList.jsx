import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onAddToWatchlist }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map(movie => (
        <MovieCard 
          key={movie.id}
          title={movie.title} 
          imgSrc={movie.imgSrc} 
          onAddToWatchlist={() => onAddToWatchlist(movie)}
        />
      ))}
    </div>
  );
};

export default MovieList;
