// Header.jsx
import { useContext, useState } from 'react';
import { AuthContext } from '../auth/authContext';

import logo from '../assets/img/logo.png';

const Header = ({ userProfile, setFilteredMovies, allMovies }) => {
  const { auth, logout } = useContext(AuthContext);
  const [searchText, setSearchText] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  if (!auth.user) return null;

  const categories = [
    'Acción', 'Comedia', 'Drama', 'Terror',
    'Ciencia Ficción', 'Romance', 'Documentales', 'Películas para Niños'
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleCategoryToggle = () => {
    setShowCategories(!showCategories);
  };

  const handleFilterMovies = (category) => {
    let filtered = allMovies;

    if (userProfile === 'niño') {
      filtered = filtered.filter(movie => movie.ageRating === 'ATP');
    }

    if (category) {
      filtered = filtered.filter(movie => movie.category === category);
    }

    setFilteredMovies(filtered);
  };

  const handleSearchMovies = () => {
    let filtered = allMovies;

    if (userProfile === 'niño') {
      filtered = filtered.filter(movie => movie.ageRating === 'ATP');
    }

    if (searchText) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  };

  return (
    <header className="bg-black text-white py-4 px-6 flex items-center justify-between shadow-md w-full">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Logo" className="h-10" />
        <div>
          <input
            type="text"
            placeholder="Buscar películas..."
            value={searchText}
            onChange={handleSearch}
            className="p-2 rounded text-black"
          />
          <button
            onClick={handleSearchMovies}
            className="ml-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={handleCategoryToggle}
          className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
        >
          Categorías
        </button>
        {showCategories && (
          <ul className="absolute top-full mt-2 bg-white text-black rounded shadow-lg p-2 z-50">
            {categories.map((cat, idx) => (
              <li
                key={idx}
                onClick={() => handleFilterMovies(cat)}
                className="cursor-pointer hover:bg-gray-200 px-2 py-1"
              >
                {cat}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={logout}
        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
      >
        Cerrar sesión
      </button>
    </header>
  );
};

export default Header;
