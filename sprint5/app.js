import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import routes from './routes/countries.js';
import { errorMiddleware } from './middleware/error.js';
import Country from './models/Country.mjs';
import { body } from 'express-validator'; // Soluciona problemas con formularios con methodoverride
import { validateCountry } from './middleware/countryValidation.js';
import methodOverride from 'method-override';


const app = express();
const PORT = 3000;

// Resolviendo __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexión a MongoDB
connectDB();

// Configuración de middlewares
app.use(express.json()); // Procesar JSON
app.use(express.urlencoded({ extended: true })); // Soluciona problemas con formularios con methodoverride
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(methodOverride('_method')); // Permite el uso de DELETE y PUT en formularios
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');

// Rutas principales
app.get('/', (req, res) => res.render('inicio', { title: 'Bienvenido' }));
app.use('/countries', routes);

// Ruta para el dashboard
app.get('/countries/dashboard', async (req, res) => {
  try {
    const countries = await Country.find();
    res.render('dashboard', { countries, title: 'Agregar Países' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los países');
  }
});

// Rutas adicionales para agregar, editar y eliminar países
app.get('/countries/add', (req, res) =>
  res.render('add-country', { title: 'Agregar País' })
);

app.post(
  '/countries/add',
  [
    body('name')
      .isLength({ min: 3, max: 90 })
      .withMessage('El nombre debe tener entre 3 y 90 caracteres.'),
      
    body('capital')
      .custom(value => Array.isArray(value) || typeof value === 'string')
      .withMessage('La capital debe ser un arreglo o una cadena de texto.'),
    
    body('borders')
      .custom(value => Array.isArray(value) || typeof value === 'string')
      .withMessage('Las fronteras deben ser un arreglo o una cadena de texto.'),

    body('area')
      .isFloat({ min: 1 })
      .withMessage('El área debe ser un número positivo.'),

    body('population')
      .isInt({ min: 1 })
      .withMessage('La población debe ser un número entero positivo.'),

    validateCountry,
  ],
  async (req, res) => {
    try {
      const { capital, borders, ...rest } = req.body;

      console.log('Datos recibidos:', req.body);

      const capitalArray = Array.isArray(capital)
        ? capital
        : capital.split(',').map(cap => cap.trim());

      const bordersArray = Array.isArray(borders)
        ? borders
        : borders.split(',').map(border => border.trim());

      const newData = {
        ...rest,
        capital: capitalArray,
        borders: bordersArray,
        name: {
          common: rest.name,
          official: rest.name,
          nativeName: {
            spa: {
              common: rest.name,
              official: rest.name
            }
          }
        }
      };

      console.log('Datos a guardar:', newData);

      const newCountry = new Country(newData);
      await newCountry.save();
      res.redirect('/countries/list');
    } catch (err) {
      console.error('Error al agregar el país:', err);
      res.status(500).send('Error al agregar el país');
    }
  }
);




// Ruta para la edición de un país
app.get('/countries/edit/:id', async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).send('País no encontrado');
    res.render('edit-country', { country, title: 'Editar País' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener el país');
  }
});


app.post(
  '/countries/edit/:id',
  [
    body('name')
      .isLength({ min: 3, max: 90 })
      .withMessage('El nombre debe tener entre 3 y 90 caracteres.'),
    body('capital')
      .custom(value => Array.isArray(value) || typeof value === 'string')
      .withMessage('La capital debe ser un arreglo o una cadena de texto.'),
    body('borders')
      .custom(value => Array.isArray(value) || typeof value === 'string')
      .withMessage('Las fronteras deben ser un arreglo o una cadena de texto.'),
    body('area')
      .isFloat({ min: 1 })
      .withMessage('El área debe ser un número positivo.'),
    body('population')
      .isInt({ min: 1 })
      .withMessage('La población debe ser un número entero positivo.'),
    validateCountry,
  ],
  async (req, res) => {
    try {
      const { capital, borders, ...rest } = req.body;

      console.log(req.body);
      console.log(rest);

      const updatedData = {
        ...rest,
        capital: Array.isArray(capital)
          ? capital
          : capital.split(',').map(cap => cap.trim()),
        borders: Array.isArray(borders)
          ? borders
          : borders.split(',').map(border => border.trim()),
        name: {
          common: rest.name,
          official: rest.name,
          nativeName: {
            spa: {
              common: rest.name,
              official: rest.name
            }
          }
        }
      };

      const updatedCountry = await Country.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );

      if (!updatedCountry) {
        return res.status(404).json({ error: 'País no encontrado' });
      }

      res.redirect('/countries/list');
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar el país' });
    }
  }
);



// Ruta para listar países
app.get('/countries/list', async (req, res) => {
  try {
    const countries = await Country.find();
    res.render('list', { countries, title: 'Lista de Países' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los países');
  }
});

// Ruta para eliminar un país
app.delete('/countries/delete/:id', async (req, res) => {
  try {
    await Country.findByIdAndDelete(req.params.id);
    res.redirect('/countries/list');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al eliminar el país');
  }
});

// Middleware de errores y rutas no encontradas
app.use(errorMiddleware);
app.use((req, res) =>
  res.status(404).render('error', {
    title: 'Error 404',
    message: 'Página no encontrada',
  })
);

// Inicia el servidor
app.listen(PORT, () =>
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
);
