// src/context/SuperHeroContext.js
import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance'; // Usamos nuestra instancia personalizada de axios

export const SuperHeroContext = createContext();

export const SuperHeroProvider = ({ children }) => {
  const [superheroes, setSuperheroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET: Obtener todos los héroes
  const fetchSuperheroes = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/heroes');
      setSuperheroes(response.data);
    } catch (err) {
      console.error('❌ Error al obtener superhéroes:', err);
      setError('Error al obtener los superhéroes');
    } finally {
      setLoading(false);
    }
  };

  // POST: Crear nuevo héroe
  const createSuperhero = async (newHero) => {
    try {
      const response = await axiosInstance.post('/heroes', newHero);
      setSuperheroes((prev) => [...prev, response.data]);
    } catch (err) {
      console.error('❌ Error al crear superhéroe:', err);
      setError('Error al crear el superhéroe');
    }
  };

  // PUT: Actualizar un héroe
  const updateSuperhero = async (id, updatedHero) => {
    try {
      const response = await axiosInstance.put(`/heroes/${id}`, updatedHero);
      setSuperheroes((prev) =>
        prev.map((hero) => (hero.id === id ? response.data : hero))
      );
    } catch (err) {
      console.error('❌ Error al actualizar superhéroe:', err);
      setError('Error al actualizar el superhéroe');
    }
  };

  // DELETE: Eliminar un héroe
  const deleteSuperhero = async (id) => {
    try {
      await axiosInstance.delete(`/heroes/${id}`);
      setSuperheroes((prev) => prev.filter((hero) => hero.id !== id));
    } catch (err) {
      console.error('❌ Error al eliminar superhéroe:', err);
      setError('Error al eliminar el superhéroe');
    }
  };

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  return (
    <SuperHeroContext.Provider value={{
      superheroes,
      setSuperheroes,
      loading,
      setLoading,
      error,
      setError,
      fetchSuperheroes,
      createSuperhero,
      updateSuperhero,
      deleteSuperhero,
    }}>
      {children}
    </SuperHeroContext.Provider>
  );
};

export default SuperHeroProvider;