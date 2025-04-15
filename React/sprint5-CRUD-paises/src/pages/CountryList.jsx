// CountryList.jsx
import React, { useContext } from 'react';
import { CountryContext } from '../context/CountryContext';  // Asegúrate de usar la importación nombrada

const CountryList = () => {
  const { countries, loading, error } = useContext(CountryContext);

  if (loading) return <div className="text-center py-4">Cargando...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="bg-blue-50 min-h-screen py-10 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Lista de Países</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {countries.map((country) => (
          <div key={country._id}>{country.name}</div> // Aquí podrías utilizar CountryCard
        ))}
      </div>
    </div>
  );
};

export default CountryList;

