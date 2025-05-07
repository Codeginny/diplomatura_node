import React from "react";

const UserModal = ({ closeModal, logout }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Opciones de usuario</h2>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              // Aquí iría el código para cambiar el perfil si es necesario
            }}
            className="text-gray-300 hover:text-white"
          >
            Cambiar perfil
          </button>
          <button
            onClick={logout}
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
