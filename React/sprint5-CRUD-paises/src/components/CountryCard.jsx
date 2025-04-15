import React from 'react';

const CountryCard = ({ country }) => {
  return (
    <div className="max-w-sm rounded-lg shadow-lg bg-white overflow-hidden border border-gray-200 transform transition-all hover:scale-105 hover:shadow-2xl">
      <img
        src={`https://flagsapi.com/${country.cca2}/flat/64.png`}
        alt={`Flag of ${country.name.common}`}
        className="w-full h-40 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-blue-600">{country.name.common}</h2>
        <p className="text-lg text-gray-700 mt-2">
          <strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}
        </p>
        <p className="text-lg text-gray-700 mt-2">
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p className="text-lg text-gray-700 mt-2">
          <strong>Area:</strong> {country.area.toLocaleString()} km²
        </p>
        <div className="mt-4 flex justify-between items-center">
          <button className="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
