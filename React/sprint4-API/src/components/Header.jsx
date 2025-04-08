// src/components/Header.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ onSearch, onGoHome, onToggleFavorites }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="flex justify-between items-center mb-4 p-4 bg-gray-900 text-white">
      <img
        src="/assets/img/logo3.png"
        alt="Rick and Morty Logo"
        className="h-20 cursor-pointer"
        onClick={() => {
          navigate("/");
          onGoHome?.();
        }}
      />


      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          className="p-2 rounded-md text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar personaje"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-[#02483e] text-white rounded-md hover:bg-[#057c46]"
        >
          Buscar
        </button>
      </form>

      <div className="flex gap-2">
        <button
          onClick={onToggleFavorites}
          className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
        >
          Favoritos
        </button>
        <button
          onClick={() => {
            navigate("/");
            onGoHome?.();
          }}
          className="bg-[#9bb61b] text-white p-2 rounded-md hover:bg-[#f8be00]"
        >
          Inicio
        </button>
      </div>
    </header>
  );
};

export default Header;





