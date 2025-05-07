import React, { useContext, useState } from "react";
import { Search, User } from "lucide-react";
import { AuthContext } from "../auth/authContext";
import UserModal from "./UserModal";
import Footer from "./Footer"; // Importamos el Footer
import logo from "../assets/img/logo.png";
import { useNavigate } from "react-router-dom";

const Header = ({ userProfile, setFilteredMovies, allMovies }) => {
  const { auth, logout } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const navigate = useNavigate();

  if (!auth.user) return null;

  const categories = [
    "Acción",
    "Comedia",
    "Drama",
    "Terror",
    "Ciencia Ficción",
    "Romance",
    "Documentales",
    "Películas para Niños",
  ];

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleCategoryToggle = () => {
    setShowCategories(!showCategories);
  };

  const handleFilterMovies = (category) => {
    let filtered = allMovies;

    if (userProfile === "niño") {
      filtered = filtered.filter((movie) => movie.ageRating === "ATP");
    }

    if (category) {
      filtered = filtered.filter((movie) => movie.category === category);
    }

    setFilteredMovies(filtered);
  };

  const handleSearchMovies = () => {
    let filtered = allMovies;

    if (userProfile === "niño") {
      filtered = filtered.filter((movie) => movie.ageRating === "ATP");
    }

    if (searchText) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredMovies(filtered);
  };

  return (
    <div>
      <header className="bg-black text-white py-4 px-6 flex items-center justify-between shadow-md w-full">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* Search, Categories, User */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchText}
              onChange={handleSearch}
              className="bg-gray-800 text-white rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={handleSearchMovies}
            />
          </div>

          {/* Categories */}
          <div className="relative">
            <button
              onClick={handleCategoryToggle}
              className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-red-500 transition"
            >
              Categorías
            </button>
            {showCategories && (
              <ul className="absolute right-0 mt-2 bg-gray-900 text-white rounded-lg shadow-lg py-2 z-50">
                {categories.map((cat, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleFilterMovies(cat)}
                    className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* User Icon */}
          <div
            className="cursor-pointer flex items-center justify-center bg-gray-800 p-2 rounded-full hover:bg-red-500 transition"
            onClick={() => setIsUserModalOpen(true)}
          >
            <User className="text-white" />
          </div>
        </div>
      </header>

      {/* User Modal */}
      {isUserModalOpen && (
        <UserModal
          closeModal={() => setIsUserModalOpen(false)}
          logout={() => {
            logout();
            navigate("/home"); // Redirigir a /home después de cerrar sesión
          }}
        />
      )}

      {/* Footer */}
      <Footer />  
    </div>
  );
};

export default Header;
