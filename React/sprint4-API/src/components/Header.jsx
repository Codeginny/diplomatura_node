import React, { useState } from "react";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold text-white">Buscador de Personajes</h1>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          className="p-2 rounded-md text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar personaje"
        />
        <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded-md">
          Buscar
        </button>
      </form>
    </header>
  );
};

export default Header;
