import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CountryEdit = () => {
  const [countryData, setCountryData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await fetch(`/api/countries/${id}`);
      const data = await response.json();
      setCountryData(data);
    };
    fetchCountry();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCountryData({ ...countryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/countries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(countryData),
      });
      toast.success('País editado con éxito');
    navigate('/items');
    } catch {
    toast.error('Error al editar el país');
    }
  };

  if (!countryData) return <div className="text-center py-4">Cargando...</div>;

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Editar País</h1>
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
              Editar País
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CountryEdit;
