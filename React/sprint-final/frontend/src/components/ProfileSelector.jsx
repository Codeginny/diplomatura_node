import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../auth/useAuth";
import { toast } from "react-toastify";

export default function ProfileSelector() {
  const { auth } = useAuth(); // Usamos auth de useAuth context
  const user = auth.user; // Ahora obtenemos el user desde `auth`
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Si no hay usuario, no hacemos nada
    if (!user) return;

    // Definimos fetchProfiles dentro de useEffect
    const fetchProfiles = async () => {
      try {
        const res = await axios.get(`/profiles/user/${user._id}`);
        setProfiles(res.data);
      } catch (error) {
        console.error("Error al cargar perfiles:", error);
        toast.error("Error al cargar perfiles");
      }
    };

    fetchProfiles(); // Llamamos a la función para cargar perfiles
  }, [user]); // Dependemos solo de `user`

  const handleSelect = (profile) => {
    localStorage.setItem("activeProfile", JSON.stringify(profile));
    navigate("/catalog");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-red-600">¿Quién está viendo?</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {profiles.map((p) => (
          <div
            key={p._id}
            className="cursor-pointer bg-neutral-800 p-4 rounded-xl hover:bg-red-700 transition"
            onClick={() => handleSelect(p)}
          >
            <img
              src={p.avatar || "/default-avatar.png"}
              alt={p.name}
              className="rounded-full w-20 h-20 mx-auto mb-2"
            />
            <p className="text-center">{p.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}