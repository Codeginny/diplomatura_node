import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "../components/Header";
import CharacterCard from "../components/CharacterCard";
import FavoritesModal from "../components/FavoritesModal";
import ErrorModal from "../components/ErrorModal";
import { FavoritesContext } from "../context/FavoritesContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const personajesPrincipales = [
  "Rick Sánchez", "Morty Smith", "Jerry Smith", "Beth Smith", "Summer Smith"
];

const personajesRecurrentes = [
  "Jessica", "Sr. Goldenfold", "Birdperson", "Squanchy", "Tammy Gueterman", "Evil Morty", 
  "Abradolf Lincler", "Señor Meeseeks", "Krombopulos Michael", "Noob-Noob", "Unity", 
  "Rey Flippy Nips", "Revolio \"Gearhead\" Clockberg Jr.", "Hemorrhage", "Jaguar", "Supernova", 
  "Beta VII", "Zeep Xanflorp", "Annie", "Diane Sánchez", "Sleepy Gary", "Risotto Groupon", 
  "Dr. Xenon Bloom", "Shleemypants", "Blim Blam", "Phoenixperson", "Gromflomite Soldado", 
  "Princesa Poneta", "Sr. Poopybutthole", "Ethan", "Nancy", "Brad", "Gene", "Joyce Smith", 
  "Leonard Smith", "Lucius Needful (El Diablo)", "Fart", "Shoneys Manager", "Cornvelious Daniel", 
  "Maggie", "Simon", "Gar Gloonch", "Beth Smith Espacial (Space Beth)", "Naruto Smith", 
  "Morty Jr.", "Gwendolyn", "Rey Jellybean", "Scary Terry", "Snowball (Snuffles)", 
  "Gazorpazorpfield", "Balthromaw", "Dr. Wong", "Purge Planet Leader", "Stacy", "Glenn", 
  "Principal Vagina", "Sherry", "Donna Gueterman", "Eli", "Gene Vagina", "Jacob", "Pat Gueterman", 
  "Reggie", "Slippery Stair", "Stealy", "Tricia Lange", "Zick Zack"
];

const Home = () => {
  const [query, setQuery] = useState("");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { favorites, removeFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    if (query.trim() === "") {
      setCharacters([]);
      return;
    }

    setLoading(true);
    axios
      .get(`https://rickandmortyapi.com/api/character/?name=${query}`)
      .then((res) => {
        setCharacters(res.data.results);
        setErrorMessage("");
        toast.success("Personajes cargados con éxito");
      })
      .catch((error) => {
        setCharacters([]);
        if (error.response && error.response.status === 404) {
          setErrorMessage("Pero no te rindas, la lista del inicio tiene joyitas.");
          toast.error("No se encontraron personajes con ese nombre.");
        } else {
          setErrorMessage("Ocurrió un error al buscar los personajes. Intente más tarde.");
          toast.error("Error al buscar personajes. Intenta más tarde.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="bg-gray-900 min-h-screen text-white py-4">
      <Header
        onSearch={setQuery}
        onGoHome={() => {
          setQuery("");
          setCharacters([]);
          setErrorMessage("");
        }}
        onToggleFavorites={() => setShowFavorites(true)}
      />

      {/* Toast para mostrar notificaciones */}
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Banner de bienvenida */}
      {query === "" && (
        <>
          <img
            src="/assets/img/header.png"
            alt="Banner Rick and Morty"
            className="w-screen h-auto object-cover block"
          />
          <div className="mt-10 space-y-4 pl-6">
            <h2 className="text-green-400 text-xl font-bold">Personajes principales:</h2>
            <ul className="list-disc list-inside text-green-300">
              {personajesPrincipales.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>

            <h2 className="text-green-400 text-xl font-bold mt-10">Personajes recurrentes:</h2>
            <ul className="list-disc list-inside text-green-300">
              {personajesRecurrentes.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Resultado de la búsqueda */}
      {loading ? (
        <p className="text-center mt-4">Cargando personajes...</p>
      ) : (
        <div className="flex flex-wrap -mx-4 mt-4">
          {characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}

      {/* Modal de favoritos */}
      <FavoritesModal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        favorites={favorites}
        onRemove={removeFavorite}
      />

      {/* Modal de error */}
      <ErrorModal
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />
    </div>
  );
};

export default Home;
