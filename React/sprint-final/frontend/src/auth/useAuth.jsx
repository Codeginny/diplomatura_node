// /src/auth/useAuth.js
import { useContext } from 'react';
import { AuthContext } from './authContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }

  return context;
};

export default useAuth; // Default export
