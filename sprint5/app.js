import express from 'express';
import bodyParser from 'body-parser';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js'; // Función de conexión a la base de datos
import routes from './routes/countries.js'; // Rutas de países
import { errorMiddleware } from './middleware/error.js'; // Importación correcta del middleware de error
import Country from './models/Country.mjs';
import { body } from 'express-validator';
import { validateCountry } from './validation/countryValidation.js';

// Inicialización de la app
const app = express();
const PORT = 3000;

// Resolviendo __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexión a MongoDB
connectDB();

// Configuración de middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
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
      .isArray()
      .withMessage('La capital debe ser un arreglo.')
      .custom((value) =>
        value.every((capital) => capital.length >= 3 && capital.length <= 90)
      )
      .withMessage('Cada capital debe tener entre 3 y 90 caracteres.'),
    body('borders')
      .isArray()
      .withMessage('Las fronteras deben ser un arreglo.')
      .custom((value) =>
        value.every((border) => /^[A-Z]{3}$/.test(border))
      )
      .withMessage('Cada frontera debe ser un código de 3 letras.'),
    body('area')
      .isFloat({ min: 1 })
      .withMessage('El área debe ser un número positivo.'),
    body('population')
      .isInt({ min: 1 })
      .withMessage('La población debe ser un número entero positivo.'),
    body('gini')
      .isFloat({ min: 0, max: 100 })
      .withMessage('El índice Gini debe estar entre 0 y 100.'),
    validateCountry,
  ],
  async (req, res) => {
    const { name, capital, borders, area, population, gini, timezones, creator } = req.body;
    const newCountry = new Country({
      name: { common: name, official: name, nativeName: {} },
      capital: [capital],
      borders: borders.split(','),
      area,
      population,
      gini: gini, // Esto es solo un número entre 0 y 100
      timezones: timezones.split(','),
      creador: creator || 'Ponce Virginia',
    });

    try {
      await newCountry.save();
      res.redirect('/countries/list');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al agregar el país');
    }
  }
);

// Ruta para la edición de un país
app.get('/countries/edit/:id', async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).send('País no encontrado');
    }
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

    // Aseguramos que 'capital' sea un arreglo
    body('capital')
      .custom((value) => {
        // Si 'capital' es una cadena de texto, la convertimos en arreglo
        if (typeof value === 'string') {
          value = [value];  // Convertimos el valor a un arreglo
        }

        // Validamos que sea un arreglo
        if (!Array.isArray(value)) {
          throw new Error('La capital debe ser un arreglo.');
        }

        // Validamos que cada capital tenga entre 3 y 90 caracteres
        if (value.some((capital) => capital.length < 3 || capital.length > 90)) {
          throw new Error('Cada capital debe tener entre 3 y 90 caracteres.');
        }
        return true;
      }),

    // Aseguramos que 'borders' sea un arreglo
    body('borders')
      .custom((value) => {
        // Si 'borders' es una cadena de texto, la convertimos en arreglo
        if (typeof value === 'string') {
          value = value.split(',').map((border) => border.trim());  // Convertimos y limpiamos
        }

        // Validamos que sea un arreglo
        if (!Array.isArray(value)) {
          throw new Error('Las fronteras deben ser un arreglo.');
        }

        // Validamos que cada frontera tenga 3 letras
        if (value.some((border) => border.length !== 3 || !/^[A-Z]{3}$/.test(border))) {
          throw new Error('Cada frontera debe ser un código de 3 letras.');
        }
        return true;
      }),

    body('area')
      .isFloat({ min: 1 })
      .withMessage('El área debe ser un número positivo.'),

    body('population')
      .isInt({ min: 1 })
      .withMessage('La población debe ser un número entero positivo.'),

    body('gini')
      .isFloat({ min: 0, max: 100 })
      .withMessage('El índice Gini debe estar entre 0 y 100.'),

    validateCountry,
  ],
  async (req, res) => {
    const { name, capital, borders, area, population, gini, timezones, creator } = req.body;

    try {
      const updatedCountry = await Country.findByIdAndUpdate(
        req.params.id,
        {
          name: { common: name, official: name, nativeName: {} },
          capital: capital, // 'capital' ya es un arreglo
          borders: borders, // 'borders' ya es un arreglo
          area,
          population,
          gini: { '2019': gini },
          timezones: timezones.split(',').map((tz) => tz.trim()),
          creador: creator || 'Ponce Virginia',
        },
        { new: true }
      );

      res.redirect('/countries/list');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al actualizar el país');
    }
  }
);






app.get('/countries/list', async (req, res) => {
  try {
    const countries = await Country.find();
    res.render('list', { countries, title: 'Lista de Países' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los países');
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
