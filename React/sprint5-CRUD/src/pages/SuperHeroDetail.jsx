import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SuperHeroContext } from '../context/SuperHeroContext';
import { toast } from 'react-toastify';

const SuperHeroDetail = () => {
  const { id } = useParams();
  const { superheroes, deleteSuperhero } = useContext(SuperHeroContext);
  const [hero, setHero] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedHero = superheroes.find((h) => h.id === id || h._id === id);
    if (selectedHero) {
      setHero(selectedHero);
    } else {
      toast.error('Superhéroe no encontrado');
      navigate('/heroes');
    }
  }, [id, superheroes, navigate]);

  if (!hero) return null;

  const heroId = hero.id || hero._id;

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este superhéroe?')) {
      deleteSuperhero(heroId); // Llamamos a la función de eliminar desde el contexto
      navigate('/heroes'); // Redirigimos a la lista después de eliminar
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{hero.nombreSuperHeroe}</h1>
        <p className="text-lg text-gray-700">Nombre real: {hero.nombreReal}</p>
        <p className="text-lg text-gray-700">Edad: {hero.edad}</p>
        <p className="text-lg text-gray-700">Planeta de origen: {hero.planetaOrigen}</p>
        <p className="text-lg text-gray-700">Debilidad: {hero.debilidad}</p>
        {hero.poder && <p className="text-lg text-gray-700">Poderes: {hero.poder.join(', ')}</p>}
        {hero.habilidadEspecial && <p className="text-lg text-gray-700">Habilidad especial: {hero.habilidadEspecial}</p>}
        {hero.aliado && <p className="text-lg text-gray-700">Aliados: {hero.aliado.join(', ')}</p>}
        {hero.enemigo && <p className="text-lg text-gray-700">Enemigos: {hero.enemigo.join(', ')}</p>}

        <div className="mt-6 flex space-x-4">
          <Link
            to={`/heroes/edit/${heroId}`}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Editar Superhéroe
          </Link>
          <button
            onClick={handleDelete}
            className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Eliminar Superhéroe
          </button>
        
          <Link
            to="/heroes"
            className="inline-block bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuperHeroDetail;

