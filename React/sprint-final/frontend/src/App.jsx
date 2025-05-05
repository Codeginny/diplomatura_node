import './styles/styles.css';
import './styles/tailwind.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router v6
import Header from './components/Header';
import MovieCatalog from './components/MovieCatalog';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import MoviePage from './pages/MoviePage';
import AdminPage from './pages/AdminPage';
import ProfileSelector from './components/ProfileSelector';
import ProfileManagement from './components/ProfileManagement';
import CreateProfile from './components/CreateProfile';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Inicio from './pages/Inicio';
import { AuthProvider } from './auth/authContext';
import Register from './pages/Register';
import axios from 'axios';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); // Modo oscuro
  const [movies, setMovies] = useState([]); // Películas
  const [filteredMovies, setFilteredMovies] = useState([]); // Películas filtradas
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [userProfile, setUserProfile] = useState(null); // Perfil del usuario

  // Cargar películas desde el backend al cargar el componente
  useEffect(() => {
    axios.get('http://localhost:5000/api/movies') // URL de tu API de backend
      .then(response => {
        setMovies(response.data);
        setFilteredMovies(response.data); // Inicialmente todas las películas
      })
      .catch(error => {
        console.error('Error al cargar las películas:', error);
      });
  }, []);

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
    if (isDarkMode) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {isAuthenticated && (
            <Header
              userProfile={userProfile}
              setFilteredMovies={setFilteredMovies}
              allMovies={movies}
              onLogout={handleLogout}
              toggleTheme={() => setIsDarkMode(prev => !prev)} // Alternar tema
              isDarkMode={isDarkMode}
            />
          )}
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Inicio />} />

            {/* Rutas protegidas */}
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/movies" element={<ProtectedRoute><MoviePage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/create-profile" element={<ProtectedRoute><CreateProfile /></ProtectedRoute>} />

            {/* Ruta selector de perfiles */}
            <Route path="/profile-selector" element={<ProfileSelector />} />
            <Route path="/profiles" element={<ProfileManagement />} />
          </Routes>
          {/* El MovieCatalog solo se renderiza si el usuario está autenticado */}
          {isAuthenticated && <MovieCatalog movies={filteredMovies} />}
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
