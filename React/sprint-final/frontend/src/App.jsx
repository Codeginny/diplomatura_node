import './styles/styles.css';
import './styles/tailwind.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import MoviePage from './pages/MoviePage';
import ProfileSelector from './components/ProfileSelector';
import ProfileManagement from './components/ProfileManagement';
import CreateProfile from './components/CreateProfile';
import ProtectedRoute from './components/ProtectedRoute';
import Inicio from './pages/Inicio';
import { AuthProvider } from './auth/authContext';
import Register from './pages/Register';
import { api } from './api/axios';
import RolePage from './pages/RolePage';

const AppContent = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const noHeaderRoutes = ["/login", "/register", "/rolepage"];

  // Cargar películas una vez que el usuario esté autenticado
  useEffect(() => {
    if (isAuthenticated) {
      api.get('http://localhost:5000/api/movies')
        .then(response => {
          setMovies(response.data);
          setFilteredMovies(response.data);
        })
        .catch(error => {
          console.error('Error al cargar las películas:', error);
        });
    }
  }, [isAuthenticated]);

  // Función de login
  const handleLogin = (profile) => {
    setIsAuthenticated(true);
    setUserProfile(profile);
  };

  // Función de logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  // Aplicar la clase 'dark' al <body> cuando el tema esté en oscuro
  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const isHeaderVisible = !noHeaderRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header Condicional */}
      {isHeaderVisible && (
        <Header
          userProfile={userProfile}
          setFilteredMovies={setFilteredMovies}
          allMovies={movies}
          onLogout={handleLogout}
          toggleTheme={() => setIsDarkMode(prev => !prev)}
          isDarkMode={isDarkMode}
        />
      )}

      {/* Contenido Principal */}
      <main className="flex-grow">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Inicio />} />

          {/* Ruta para seleccionar perfil */}
          <Route path="/rolepage" element={<RolePage />} />

          {/* Rutas Protegidas */}
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/movies" element={<ProtectedRoute><MoviePage /></ProtectedRoute>} />
          <Route path="/create-profile" element={<ProtectedRoute><CreateProfile /></ProtectedRoute>} />

          {/* Rutas de Perfiles */}
          <Route path="/profile-selector" element={<ProfileSelector />} />
          <Route path="/profiles" element={<ProfileManagement />} />
        </Routes>

      </main>

      {/* Footer único al final */}
      <Footer />
    </div>
  );
};

const App = () => (
  <Router>
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  </Router>
);

export default App;
