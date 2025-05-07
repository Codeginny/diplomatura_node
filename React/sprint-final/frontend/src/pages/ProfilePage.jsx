import { useState, useEffect, useCallback } from "react";
import useAuth from "../auth/useAuth";
import { toast } from "react-toastify";
import { api } from "../api/axios";

const ProfilePage = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [profileId, setProfileId] = useState(null);

  // Asegúrate de que el profileId se obtenga de localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem("activeProfile");
    if (storedProfile) {
      setProfileId(JSON.parse(storedProfile)._id); // Establece el profileId desde el perfil activo
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    if (!profileId) return; // No hacer la solicitud si no hay profileId

    try {
      const response = await api.get(`/profiles/${profileId}`);
      setProfile(response.data);
      setWatchlist(response.data.watchlist);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error al cargar perfil");
    } finally {
      setLoading(false);
    }
  }, [profileId]);

  useEffect(() => {
    if (user && profileId) {
      fetchProfile();
    }
  }, [user, profileId, fetchProfile]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"} transition-all`}>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-red-600">Perfil de {profile?.name}</h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {watchlist.map((movie) => (
          <div key={movie._id} className="bg-gray-200 p-4 rounded-md">
            <h3 className="text-xl font-bold">{movie.title}</h3>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;



