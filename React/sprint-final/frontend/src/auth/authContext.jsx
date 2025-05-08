// src/auth/authContext.jsx
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    profile: null, // 'adulto' o 'niño'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuth((prev) => ({ ...prev, token }));

      const fetchUser = async () => {
        try {
          const res = await api.get("/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setAuth((prev) => ({ ...prev, user: res.data }));
        } catch (error) {
          console.error(
            "Error al obtener usuario:",
            error.response?.data?.message || error.message
          );
          logout();
        }
      };

      fetchUser();
    }
  }, []);

  /**
   * Función para iniciar sesión
   * @param {Object} userData - Datos del usuario
   * @param {string} token - Token JWT
   */
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setAuth({ user: userData, token, profile: null });
  };

  /**
   * Función para seleccionar un perfil
   * @param {string} profile - Perfil seleccionado ('adulto' o 'niño')
   */
  const selectProfile = (profile) => {
    setAuth((prev) => ({ ...prev, profile }));

    // Redirigir a movies con base en el perfil seleccionado
    navigate("/movies");
  };

  /**
   * Función para cerrar sesión
   */
  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ user: null, token: null, profile: null });
    navigate("/login");
  };

  /**
   * Función para obtener películas filtradas
   * @param {string} category - Categoría de la película
   * @param {string} ageRating - Clasificación de edad (ej. 'ATP', '+18')
   * @returns {Promise<Array>} - Array de películas filtradas
   */
  const fetchFilteredMovies = async (category, ageRating) => {
    try {
      const params = {
        category: category || "",
        ageRating: ageRating || "",
      };

      const res = await api.get("/movies/filtered", {
        params,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      return res.data;
    } catch (err) {
      console.error("Error al obtener películas filtradas:", err.response?.data?.message || err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        selectProfile,
        logout,
        fetchFilteredMovies,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
