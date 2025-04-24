import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SuperHeroCreate = () => {
  const [heroData, setHeroData] = useState({
    nombreSuperHeroe: '',
    nombreReal: '',
    edad: '',
    planetaOrigen: '',
    debilidad: '',
    poder: '',
    habilidadEspecial: '',
    aliado: '',
    enemigo: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeroData({ ...heroData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // URL de MockAPI para la creación de un nuevo superhéroe
      const response = await fetch('https://680a8019d5075a76d98835ec.mockapi.io/api/v2/heroes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroData),
      });

      if (response.ok) {
        toast.success('Superhéroe creado con éxito');
        navigate('/heroes'); // Redirige a la lista de héroes después de la creación
      } else {
        toast.error('Error al crear el superhéroe');
      }
    } catch (error) {
      console.error('Error al crear el superhéroe:', error);
      toast.error('Error al crear el superhéroe');
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Crear Nuevo Superhéroe</h1>
        <form onSubmit={handleSubmit}>
          {/* Campo de nombreSuperHeroe */}
          <div className="mb-4">
            <label htmlFor="nombreSuperHeroe" className="block text-lg font-semibold text-gray-700">
              Nombre del Superhéroe
            </label>
            <input
              type="text"
              name="nombreSuperHeroe"
              id="nombreSuperHeroe"
              value={heroData.nombreSuperHeroe}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Campo de nombreReal */}
          <div className="mb-4">
            <label htmlFor="nombreReal" className="block text-lg font-semibold text-gray-700">
              Nombre Real
            </label>
            <input
              type="text"
              name="nombreReal"
              id="nombreReal"
              value={heroData.nombreReal}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Campo de edad */}
          <div className="mb-4">
            <label htmlFor="edad" className="block text-lg font-semibold text-gray-700">
              Edad
            </label>
            <input
              type="number"
              name="edad"
              id="edad"
              value={heroData.edad}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Campo de planetaOrigen */}
          <div className="mb-4">
            <label htmlFor="planetaOrigen" className="block text-lg font-semibold text-gray-700">
              Planeta de Origen
            </label>
            <input
              type="text"
              name="planetaOrigen"
              id="planetaOrigen"
              value={heroData.planetaOrigen}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Campo de debilidad */}
          <div className="mb-4">
            <label htmlFor="debilidad" className="block text-lg font-semibold text-gray-700">
              Debilidad
            </label>
            <input
              type="text"
              name="debilidad"
              id="debilidad"
              value={heroData.debilidad}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Campo de poder */}
          <div className="mb-4">
            <label htmlFor="poder" className="block text-lg font-semibold text-gray-700">
              Poderes (separados por comas)
            </label>
            <input
              type="text"
              name="poder"
              id="poder"
              value={heroData.poder}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Campo de habilidadEspecial */}
          <div className="mb-4">
            <label htmlFor="habilidadEspecial" className="block text-lg font-semibold text-gray-700">
              Habilidad Especial
            </label>
            <input
              type="text"
              name="habilidadEspecial"
              id="habilidadEspecial"
              value={heroData.habilidadEspecial}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Campo de aliado */}
          <div className="mb-4">
            <label htmlFor="aliado" className="block text-lg font-semibold text-gray-700">
              Aliados (separados por comas)
            </label>
            <input
              type="text"
              name="aliado"
              id="aliado"
              value={heroData.aliado}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Campo de enemigo */}
          <div className="mb-4">
            <label htmlFor="enemigo" className="block text-lg font-semibold text-gray-700">
              Enemigos (separados por comas)
            </label>
            <input
              type="text"
              name="enemigo"
              id="enemigo"
              value={heroData.enemigo}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Crear Superhéroe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuperHeroCreate;
