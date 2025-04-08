import React from "react";

const ErrorModal = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-gray-800 text-white p-6 rounded-xl max-w-md w-full shadow-lg relative">
        <button
          className="absolute top-2 right-4 text-2xl text-gray-300 hover:text-red-400"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">⚠️ 404: Morty no lo encontró...</h2>
        <p className="text-gray-200">{message}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
