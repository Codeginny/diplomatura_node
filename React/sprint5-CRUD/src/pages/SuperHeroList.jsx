import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuperHeroList = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        // Cambié la URL aquí
        const response = await fetch('https://680a8019d5075a76d98835ec.mockapi.io/api/v2/heroes');
        const data = await response.json();
        setSuperheroes(data);
      } catch (error) {
        console.error('Error al obtener superhéroes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Lista de Superhéroes</h1>
        <button
          onClick={() => navigate('/heroes/create')}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Crear superhéroe
        </button>
      </div>

      {loading ? (
        <p className="text-center text-lg">🦸‍♀️ Cargando superhéroes...</p>
      ) : superheroes.length === 0 ? (
        <p className="text-center text-gray-600">No hay superhéroes aún. ¡Creá el primero!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {superheroes.map((hero) => (
            <div key={hero._id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-bold text-blue-600 mb-1">{hero.nombreSuperHeroe}</h2>
              <p className="text-gray-700">Nombre real: {hero.nombreReal}</p>
              <p className="text-gray-700">Planeta: {hero.planetaOrigen}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => navigate(`/heroes/${hero._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  +info
                </button>
                <button
                  onClick={() => navigate(`/heroes/edit/${hero._id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuperHeroList;

