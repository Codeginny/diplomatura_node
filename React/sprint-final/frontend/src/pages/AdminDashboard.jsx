// src/pages/AdminDashboard.jsx
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/authContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  if (auth.user?.role !== "admin") {
    return <p>No tienes permisos para acceder a esta página.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">Panel de Administración</h2>
      <div className="flex gap-6">
        <button
          onClick={() => navigate("/admin/users")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
        >
          USUARIOS
        </button>
        <button
          onClick={() => navigate("/admin/movies")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
        >
          PELÍCULAS
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
