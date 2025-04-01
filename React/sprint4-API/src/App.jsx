import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import CharacterCard from "./components/CharacterCard";
import Favorites from "./components/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(""); // Estado para manejar la búsqueda

  const fetchCharacters = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${query}`
      );
      if (response.data.results) {
        setCharacters(response.data.results);
        toast.success("Personajes cargados con éxito");
      } else {
        setCharacters([]);
        toast.warning("No se encontraron personajes");
      }
    } catch (error) {
      toast.error("Error al obtener los personajes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchCharacters(query);
    }
  }, [query]);

  return (
    <FavoritesProvider>
      <div className="bg-gray-900 min-h-screen text-white p-4">
        <Header onSearch={setQuery} />
        {loading ? (
          <p className="text-center mt-4">Cargando personajes...</p>
        ) : (
          <div className="grid gap-4 mt-4">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
        <Favorites />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </FavoritesProvider>
  );
};

export default App;
