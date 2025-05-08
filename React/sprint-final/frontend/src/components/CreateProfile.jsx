import { useState } from 'react';

const CreateProfile = ({ onCreateProfile }) => {
  const [role, setRole] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));  // Para previsualizar la imagen
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Enviar los datos del perfil (nombre, rol, imagen)
    if (role) {
      onCreateProfile({ role, profileImage });
    } else {
      alert('Por favor, selecciona un rol.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-lg shadow-lg w-96 mx-auto mt-8">
      <h2 className="text-2xl text-white mb-4">Crear Perfil</h2>

      {/* Selección de Rol */}
      <div className="mb-4">
        <label className="text-white block mb-2">Selecciona el tipo de perfil:</label>
        <div className="flex space-x-4">
          <div>
            <input
              type="radio"
              id="adulto"
              name="role"
              value="adulto"
              checked={role === 'adulto'}
              onChange={handleRoleChange}
              className="text-white"
            />
            <label htmlFor="adulto" className="text-white">Adulto</label>
          </div>
          <div>
            <input
              type="radio"
              id="nino"
              name="role"
              value="niño"
              checked={role === 'niño'}
              onChange={handleRoleChange}
              className="text-white"
            />
            <label htmlFor="nino" className="text-white">Niño</label>
          </div>
        </div>
      </div>

      {/* Subir imagen de perfil */}
      <div className="mb-4">
        <label className="text-white block mb-2">Sube tu foto de perfil:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-white"
        />
        {profileImage && (
          <div className="mt-4">
            <img
              src={profileImage}
              alt="Vista previa"
              className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
            />
          </div>
        )}
      </div>

      {/* Botón para crear el perfil */}
      <button
        onClick={handleSubmit}
        className="bg-red-600 text-white py-2 px-6 rounded-full mt-4 hover:bg-red-500"
      >
        Crear Perfil
      </button>
    </div>
  );
};

export default CreateProfile;
