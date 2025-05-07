import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {  // Solo recibes `children`
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (!auth.user) {
          throw new Error("No estás autenticado.");
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    checkUser();
  }, [auth.user]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return auth.user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
