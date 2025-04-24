// src/hooks/useSuperHeroContext.js
import { useContext } from 'react';
import { SuperHeroContext } from '../context/SuperHeroContext';

const useSuperHeroContext = () => {
  const context = useContext(SuperHeroContext);
  if (!context) {
    throw new Error('useSuperHeroContext debe usarse dentro de SuperHeroProvider');
  }
  return context;
};

export default useSuperHeroContext;
