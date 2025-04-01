import React, { useState } from 'react';

const SearchForm = ({ setQuery }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(input); // Envía el valor de búsqueda al componente principal (App)
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Buscar personaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 rounded-l-md"
        />
        <button type="submit" className="bg-[#057c46] text-white p-2 rounded-r-md">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
