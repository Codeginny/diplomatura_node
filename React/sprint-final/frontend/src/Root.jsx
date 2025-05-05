import './styles/styles.css';
import './styles/tailwind.css';
import { useState, useEffect } from 'react';
import App from './App';
import { AuthProvider } from './auth/authContext';

const Root = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Efecto para aplicar el tema en el body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <AuthProvider>
      <App toggleTheme={() => setIsDarkMode(prev => !prev)} isDarkMode={isDarkMode} />
    </AuthProvider>
  );
};

export default Root;
