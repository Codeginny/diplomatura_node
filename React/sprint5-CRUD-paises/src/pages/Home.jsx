import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center">
      <div className="text-center p-10 bg-white rounded-lg shadow-xl w-full sm:w-1/2 lg:w-1/3">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Bienvenido a la App de Países</h1>
        <p className="text-lg text-gray-700 mb-6">
          Explora información sobre países, agrega nuevos, edita o elimina los existentes.
        </p>
        <Link
          to="/countries"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Comenzar
        </Link>
      </div>
    </div>
  );
};

export default Home;
