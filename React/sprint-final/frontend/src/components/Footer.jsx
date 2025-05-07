import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGoogle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 px-10 mt-10">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center">
        {/* Texto principal */}
        <div className="text-center mb-4">
          <h3 className="text-1xl font-semibold text-red-500">Proyecto de Desarrollo</h3>
          <p className="text-1xl text-gray-300 mt-2">
            Diplomatura Full Stack Nodo Tecnológico (Catamarca)
          </p>
        </div>

        {/* Redes sociales */}
        <div className="flex space-x-6 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaGoogle size={20} />
          </a>
        </div>

        {/* Texto de copyright y nombre */}
        <div className="text-center mt-4 text-gray-500">
          <p>Desarrollado por: Ponce Virginia Alejandra</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
