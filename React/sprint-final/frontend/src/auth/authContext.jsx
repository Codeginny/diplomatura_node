// authContext.js
import { createContext, useState, useEffect } from 'react';

// 1. Crear el contexto
const AuthContext = createContext();

// 2. Crear el proveedor de contexto
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(prev => ({ ...prev, token }));
    }
  }, []);

  // Función de login
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setAuth({ user: userData, token });
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ user: null, token: null });
  };

  // Proveer el contexto
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Exportar el contexto y el proveedor
export { AuthContext, AuthProvider };
