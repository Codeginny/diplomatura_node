import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    profile: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
  
    if (storedToken) {
      api
        .get("http://localhost:5000/api/users/me", {  // Asegúrate de incluir el prefijo 'api'
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          console.log("Usuario autenticado:", response.data);
          setAuth({ user: response.data, token: storedToken, profile: null });
        })
        .catch((error) => {
          console.error("Error al obtener usuario:", error.response?.data || error.message);
          setAuth({ user: null, token: null, profile: null });
          localStorage.removeItem("token");
        });
    } else {
      console.log("No hay token en localStorage.");
    }
  }, []);
  
  console.log("AuthProvider - Usuario actual:", auth.user); 

  const login = (user, token) => {
    console.log("Login - Usuario:", user);
    console.log("Login - Token:", token);

    setAuth({ user, token, profile: null });

    if (token) {
      localStorage.setItem("token", token);
      console.log("Token guardado en AuthContext:", localStorage.getItem("token"));
    }
  };

  const logout = () => {
    console.log("AuthProvider - Usuario desconectado.");
    setAuth({ user: null, token: null, profile: null });
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
