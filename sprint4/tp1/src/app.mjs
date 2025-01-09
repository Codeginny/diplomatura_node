import express from 'express';
import path from 'path';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import methodOverride from 'method-override';
import expressLayouts from 'express-ejs-layouts';

// Configuración para ES Module de __dirname
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializa la app
const app = express();
const PORT = 3000;

// Configuración de vistas y EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views')); // Esto asegura que Express vea la carpeta views correctamente

app.use(expressLayouts);
app.set('layout', 'partials/layout'); // Layout principal

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Conexión a la base de datos
connectDB();

// Rutas principales
app.get('/', (req, res) => {
  res.render('index', { title: 'Página de Superhéroes' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'Sobre Nosotros' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contacto' });
});

// Rutas adicionales
app.use('/', superHeroRoutes);

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Error 404',
    error: 'Página no encontrada',
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
