// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <FavoritesProvider>
      {/* ToastContainer para mostrar los mensajes */}
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </FavoritesProvider>
  );
};

export default App;

