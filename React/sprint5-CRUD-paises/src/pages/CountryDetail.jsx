// CountryDetail.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CountryContext } from '../context/CountryContext';  // Importación nombrada

const CountryDetail = () => {
  const { id } = useParams();
  const { countries } = useContext(CountryContext);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const selectedCountry = countries.find((c) => c._id === id);
    setCountry(selectedCountry);
  }, [id, countries]);

  if (!country) return <div className="text-center py-4">Cargando...</div>;

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">{country.name.common}</h1>
        <p className="text-lg text-gray-700">Nombre oficial: {country.name.official}</p>
        <p className="text-lg text-gray-700">Capital: {country.capital.join(', ')}</p>
        <p className="text-lg text-gray-700">Área: {country.area} km²</p>
        <p className="text-lg text-gray-700">Población: {country.population}</p>
        <p className="text-lg text-gray-700">Fronteras: {country.borders.join(', ')}</p>
        <div className="mt-6">
          <Link
            to={`/items/${country._id}/edit`}
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 mr-4"
          >
            Editar País
          </Link>
          <Link
            to="/items"
            className="inline-block bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            Volver a la lista
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;

