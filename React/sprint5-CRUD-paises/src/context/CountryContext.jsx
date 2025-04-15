// CountryContext.jsx
import React, { createContext, useState, useEffect } from 'react';

const CountryContext = createContext();

const CountryContextProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountries = async () => {
    const response = await fetch('API_URL');
    if (!response.ok) {
      setError('Error fetching countries');
      setLoading(false);
      return;
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      setCountries(data);
    } else {
      setError('La respuesta no es un array de países');
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <CountryContext.Provider value={{ countries, loading, error, fetchCountries }}>
      {children}
    </CountryContext.Provider>
  );
};

export { CountryContext, CountryContextProvider };  // Exportación nombrada



