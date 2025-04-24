import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SuperHeroContext } from '../context/SuperHeroContext';

const SuperHeroEdit = () => {
  const [heroData, setHeroData] = useState(null);
  const { id } = useParams();
  const { superheroes, updateSuperhero } = useContext(SuperHeroContext);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedHero = superheroes?.find((hero) => hero.id === id || hero._id === id);
    if (selectedHero) {
      setHeroData(selectedHero);
    } else {
      toast.error('Superhéroe no encontrado');
      navigate('/heroes');
    }
  }, [id, superheroes, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("Cambiando:", name, "=>", value);
    setHeroData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSuperhero(id, heroData);
      toast.success('Superhéroe editado con éxito');
      navigate('/heroes'); // ✅ redirige correctamente
    } catch (error) {
      console.error('❌ Error al editar el superhéroe:', error);
      toast.error('Error al editar el superhéroe');
    }
  };
  

  if (!heroData) return null;


  console.log("Hero data:", heroData);

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Editar Superhéroe</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Nombre del Superhéroe" name="nombreSuperHeroe" value={heroData.nombreSuperHeroe} onChange={handleChange} />
          <Input label="Edad" name="edad" type="number" value={heroData.edad} onChange={handleChange} />
          <Input label="Planeta de Origen" name="planetaOrigen" value={heroData.planetaOrigen} onChange={handleChange} />
          <Input label="Debilidad" name="debilidad" value={heroData.debilidad} onChange={handleChange} />
          <Input label="Nombre Real" name="nombreReal" value={heroData.nombreReal} onChange={handleChange} />
          <Input label="Creador" name="creador" value={heroData.creador} onChange={handleChange} />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Guardar Cambios
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

// Componente Input reutilizable
const Input = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label htmlFor={name} className="block text-lg font-semibold text-gray-700">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value ?? ''}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg"
    />
  </div>
);

export default SuperHeroEdit;




