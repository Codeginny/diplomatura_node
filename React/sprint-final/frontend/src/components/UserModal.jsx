import React from "react";
import { useNavigate } from "react-router-dom";

const UserModal = ({ closeModal, logout }) => {
  const navigate = useNavigate();

  const handleChangeProfile = () => {
    // Redirige a la página RolePage para cambiar el perfil
    navigate("/rolepage");
  };

  const handleLogout = () => {
    // Realiza el logout (suponiendo que la función logout maneja el cierre de sesión)
    logout();
    // Redirige a la página de Inicio
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Opciones de usuario</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleChangeProfile}
            className="text-gray-300 hover:text-white"
          >
            Cambiar perfil
          </button>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-400"
          >
            Cerrar sesión
          </button>
          <button
            className="text-gray-400 mt-4 hover:text-white"
            onClick={closeModal} // Cerrar el modal
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
