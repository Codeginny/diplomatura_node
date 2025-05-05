// src/pages/Inicio.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import logo from '../assets/img/logo.png';

export default function Inicio() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!email) {
      alert("Por favor ingresa tu correo electrónico");
      return;
    }
    navigate("/register");
  };
  

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      <main className="flex flex-col items-center justify-center text-center px-4 py-16">
        <img src={logo} alt="Logo" className="w-[350px] md:w-[450px] mt-20 mb-12 transition-all duration-300 ease-in-out transform hover:scale-110" />

        <button
          onClick={handleLogin}
          className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 mb-10 transition-all duration-300 transform hover:scale-105"
        >
          Iniciar sesión
        </button>

        <h1 className="text-4xl font-extrabold mb-6 max-w-2xl leading-tight">
          Películas y series ilimitadas y mucho más
        </h1>
        <p className="text-xl mb-3 max-w-2xl mx-auto">
          A partir de $5.999. Cancela cuando quieras.
        </p>
        <p className="text-lg mb-8 mx-auto max-w-2xl">
          ¿Quieres ver Netflix ya? Ingresa tu email para crear una cuenta o reiniciar tu membresía de Netflix.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-md mb-8">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-6 py-3 rounded-md w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition-all duration-300 ease-in-out"
          />
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 w-full sm:w-auto mt-4 sm:mt-0 transition-all duration-300"
          >
            Crear cuenta
          </button>
        </div>
      </main>

      <footer className="bg-black text-white py-12 mt-16">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-400 mb-2">© 2025 - Ponce Virginia Alejandra</p>
            <p className="text-sm text-gray-400 mb-6">Todos los derechos reservados.</p>
            <div className="flex justify-center gap-8 text-red-600 text-3xl">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition-all duration-200"><FaInstagram /></a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition-all duration-200"><FaFacebook /></a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-700 transition-all duration-200"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
