import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

// Crea el contexto
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    profile: null, // Si necesitas almacenar también el perfil, lo puedes manejar aquí.
  });

  const navigate = useNavigate();

  // useEffect para cargar el usuario si hay un token en el localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
  
    if (storedToken) {
      api
        .get("http://localhost:5000/api/users/me", {  // Asegúrate de que la URL sea correcta
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
          localStorage.removeItem("token"); // Eliminar el token si hay un error
        });
    } else {
      console.log("No hay token en localStorage.");
    }
  }, []);

  console.log("AuthProvider - Usuario actual:", auth.user); 

  // Función para hacer login
  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;
  
      console.log("Usuario autenticado:", user);
  
      // Guardar token en localStorage
      localStorage.setItem("token", token);
  
      // Actualizar el estado de autenticación
      setAuth({ user, token, profile: null });
  
      // Verificar el rol del usuario y redirigir
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/movies");
      }
  
      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      console.error("Error en el login:", error.response?.data || error.message);
      toast.error("Correo o contraseña incorrectos.");
    }
  };
  

  // Función para hacer logout
  const logout = () => {
    console.log("AuthProvider - Usuario desconectado.");
    setAuth({ user: null, token: null, profile: null });
    localStorage.removeItem("token");
    navigate("/login"); // Redirigir a la página de login
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
