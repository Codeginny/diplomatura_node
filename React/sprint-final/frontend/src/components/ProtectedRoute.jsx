import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth/authContext";

const ProtectedRoute = ({ children, roles }) => {
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ProtectedRoute - Usuario actual:", auth.user);
    console.log("ProtectedRoute - Token actual:", auth.token);
    console.log("ProtectedRoute - Roles permitidos:", roles);

    // Si no hay token, redirigir al login
    if (!auth.token) {
      console.warn("ProtectedRoute - Token no encontrado. Redirigiendo a /login");
      setLoading(false);
      return;
    }

    // Si el usuario aún no está cargado, espera hasta que se cargue
    if (!auth.user) {
      console.log("ProtectedRoute - Usuario aún no cargado. Esperando...");
      return;
    }

    // Si hay roles definidos y el rol del usuario no está en la lista, denegar acceso
    if (roles && !roles.includes(auth.user.role)) {
      console.warn(`ProtectedRoute - Acceso denegado. Rol actual: ${auth.user.role}`);
      setLoading(false);
      return;
    }

    console.log("ProtectedRoute - Acceso permitido.");
    setLoading(false);
  }, [auth.user, auth.token, roles]);

  if (loading) {
    console.log("ProtectedRoute - Cargando...");
    return <div>Cargando...</div>;
  }

  // Si no está autenticado o no tiene permisos, redirigir al login
  if (!auth.user) {
    console.warn("ProtectedRoute - Usuario no autenticado. Redirigiendo a /login");
    return <Navigate to="/login" />;
  }

  console.log("ProtectedRoute - Acceso permitido.");
  return children;
};

export default ProtectedRoute;
