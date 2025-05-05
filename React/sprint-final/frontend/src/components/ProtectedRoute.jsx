import { Route, Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        if (!user) {
          throw new Error("No estás autenticado.");
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    checkUser();
  }, [user]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
