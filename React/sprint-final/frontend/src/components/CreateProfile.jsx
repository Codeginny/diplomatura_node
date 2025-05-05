import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("El nombre es obligatorio");
      return;
    }

    setLoading(true);
    try {
      const profileData = { name, avatar };
      await axios.post("/profiles", profileData);
      toast.success("Perfil creado exitosamente");
      navigate("/profiles"); // Redirigir a la página de gestión de perfiles
    } catch (error) {
      toast.error("Error al crear perfil");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Crear Nuevo Perfil</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs p-4 bg-neutral-800 rounded-xl">
        <div>
          <label className="block text-sm font-semibold mb-1">Nombre del perfil</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Avatar (URL opcional)</label>
          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear Perfil"}
        </button>
      </form>
    </div>
  );
}
