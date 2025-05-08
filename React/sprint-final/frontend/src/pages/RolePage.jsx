import { useContext } from "react";
import { AuthContext } from "../auth/authContext";
import { useNavigate } from "react-router-dom"; 
import perfilAdulto from "../assets/img/perfiladulto.png";
import perfilNino from "../assets/img/perfilnino.png";

const RolePage = () => {
  const { selectProfile, auth } = useContext(AuthContext); // Asegúrate de que selectProfile esté en el contexto
  const navigate = useNavigate(); 

  // Función para navegar al formulario de creación de perfil
  const navigateToCreateProfile = () => {
    navigate("/create-profile");  // Redirigir a la página de creación de perfil
  };

  // Función que maneja la selección del perfil
  const handleSelectProfile = (profile) => {
    selectProfile(profile);  // Actualiza el perfil en el contexto
    navigate("/movies");  // Redirige al catálogo de películas
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex space-x-10">
        {/* Perfil Adulto */}
        <div
          className="cursor-pointer hover:scale-105 transition-transform"
          onClick={() => handleSelectProfile("adulto")}
        >
          <div className="w-48 h-48 bg-red-600 rounded-lg flex items-center justify-center">
            <img 
              src={perfilAdulto} 
              alt="Perfil Adulto" 
              className="w-full h-full object-cover rounded-lg" 
            />
          </div>
          <p className="text-center text-white mt-2">Perfil Adulto</p>
        </div>

        {/* Perfil Niño */}
        <div
          className="cursor-pointer hover:scale-105 transition-transform"
          onClick={() => handleSelectProfile("niño")}
        >
          <div className="w-48 h-48 bg-red-600 rounded-lg flex items-center justify-center">
            <img 
              src={perfilNino} 
              alt="Perfil Niño" 
              className="w-full h-full object-cover rounded-lg" 
            />
          </div>
          <p className="text-center text-white mt-2">Perfil Niño</p>
        </div>

        {/* Cuadro para crear nuevo perfil */}
        <div
          className="cursor-pointer hover:scale-105 transition-transform border-4 border-red-600 w-48 h-48 flex items-center justify-center"
          onClick={navigateToCreateProfile} 
        >
          <span className="text-red-600 text-4xl">+</span>
        </div>
      </div>
    </div>
  );
};

export default RolePage;
