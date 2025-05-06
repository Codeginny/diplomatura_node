import { useState, useEffect } from "react";
import useAuth from "../auth/useAuth";
import { toast } from "react-toastify";
import { api } from "../api/axios";
import { useNavigate } from "react-router-dom";

const ProfileManagement = () => {
  const { user, logout } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const fetchProfiles = async () => {
    try {
      const response = await api.get(`/profiles`);
      setProfiles(response.data);
    } catch (error) {
      toast.error("Error al cargar perfiles");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = async (profileId) => {
    try {
      await api.delete(`/profiles/${profileId}`);
      setProfiles(profiles.filter((profile) => profile._id !== profileId));
      toast.success("Perfil eliminado");
    } catch (error) {
      toast.error("Error al eliminar perfil");
      console.error(error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Has cerrado sesión");
  };

  useEffect(() => {
    if (user) {
      fetchProfiles();
    }
  }, [user]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"} transition-all`}>
      <div className="flex justify-between items-center p-4">
        <h1 className="text-3xl font-bold text-red-600">Administrar Perfiles</h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Cerrar Sesión
        </button>
      </div>

      <button
        onClick={() => navigate("/create-profile")}
        className="bg-green-600 text-white px-4 py-2 rounded-md m-4"
      >
        Crear Nuevo Perfil
      </button>

      {loading ? (
        <div className="flex justify-center items-center">
          <p>Cargando...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          {profiles.map((profile) => (
            <div key={profile._id} className="bg-gray-200 p-4 rounded-md">
              <h3 className="text-xl font-bold">{profile.name}</h3>
              <button
                onClick={() => deleteProfile(profile._id)}
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded-md"
              >
                Eliminar Perfil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileManagement;

