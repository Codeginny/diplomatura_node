import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CountryCreate = () => {
  const [countryData, setCountryData] = useState({
    name: { common: '', official: '', nativeName: { spa: { common: '', official: '' } } },
    capital: '',
    area: '',
    population: '',
    borders: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCountryData({ ...countryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/countries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(countryData),
      });
      toast.success('País creado con éxito');
    navigate('/items');
    } catch {
    toast.error('Error al crear el país');
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Crear Nuevo País</h1>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="mb-4">
            <label htmlFor="name.common" className="block text-lg font-semibold text-gray-700">
              Nombre Común
            </label>
            <input
              type="text"
              name="name.common"
              id="name.common"
              value={countryData.name.common}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
          {/* Repeat similar fields for other attributes */}
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Crear País
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CountryCreate;
