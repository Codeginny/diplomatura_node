import express from 'express';
import Country from '../models/Country.mjs'; // Modelo de país
import { body } from 'express-validator';
import { validateCountry } from '../validation/countryValidation.js';

const router = express.Router();

// Ruta para la página de inicio
router.get('/', (req, res) => {
    res.render('inicio', { title: 'Página de Inicio' });
});

// Ruta para listar todos los países
router.get('/countries/list', async (req, res) => {
    try {
      const countries = await Country.find();
  
      const processedCountries = countries.map(country => {
        let commonName = 'Nombre no disponible';
  
        // Verificar la existencia del campo common y hacer fallback si es necesario
        if (country.name && country.name.nativeName && country.name.nativeName.spa) {
          if (country.name.nativeName.spa.common) {
            commonName = country.name.nativeName.spa.common;
          } else if (country.name.common) {
            commonName = country.name.common;  // Si no tiene nativeName.spa.common, buscar common directamente
          }
        }
  
        // Añadimos el nombre común al objeto del país
        country.name.commonName = commonName;
  
        return country;
      });
  
      res.render('list', { countries: processedCountries });
    } catch (error) {
      console.error(error);
      res.status(500).send('Algo salió mal');
    }
  });
  
  

// Ruta para el dashboard de países
router.get('/countries/dashboard', async (req, res) => {
    try {
      const countries = await Country.find(); // Recupera todos los países
      const totalPopulation = countries.reduce((acc, country) => acc + country.population, 0);
      const avgGini = countries.reduce((acc, country) => acc + country.gini['2019'], 0) / countries.length;
      const totalArea = countries.reduce((acc, country) => acc + country.area, 0);

      // Agregar los console.log() para depuración
      console.log('Countries:', countries);
      console.log('Total Population:', totalPopulation);
      console.log('Avg Gini:', avgGini);
      console.log('Total Area:', totalArea);

      // Renderizar la vista con los datos
      res.render('dashboard', { 
        countries, 
        totalPopulation,
        avgGini,
        totalArea,
        title: 'Agregar Países',
        body: 'Contenido de dashboard' // Aquí pasamos la variable body
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Algo salió mal, por favor intenta más tarde');
    }
});

// Ruta para editar un país
router.get('/countries/edit/:id', async (req, res) => {
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

// Ruta para actualizar el país
router.post('/countries/edit/:id', [
    // Validaciones de los campos
], async (req, res) => {
    const { name, capital, borders, area, population, gini, timezones, creator } = req.body;

    try {
        const updatedCountry = await Country.findByIdAndUpdate(req.params.id, {
            name: { common: name, official: name, nativeName: {} },
            capital: [capital],
            borders: borders.split(','),
            area,
            population,
            gini: { '2019': gini },
            timezones: timezones.split(','),
            creador: creator || 'Ponce Virginia'
        }, { new: true });  // Devuelve el documento actualizado

        res.redirect(`/countries/list`);  // Redirige a la lista de países después de la actualización
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el país');
    }
});


// Ruta para agregar un nuevo país
router.get('/countries/add', (req, res) => {
    res.render('add-country', { title: 'Agregar País' });
});

// Ruta para guardar el nuevo país
router.post('/countries/add', [
    body('name').isLength({ min: 3, max: 90 }).withMessage('El nombre debe tener entre 3 y 90 caracteres.'),
    body('capital').isArray().withMessage('La capital debe ser un arreglo.')
        .custom((value) => value.every(capital => capital.length >= 3 && capital.length <= 90))
        .withMessage('Cada capital debe tener entre 3 y 90 caracteres.'),
    body('borders').isArray().withMessage('Las fronteras deben ser un arreglo.')
        .custom((value) => value.every(border => /^[A-Z]{3}$/.test(border)))
        .withMessage('Cada frontera debe ser un código de 3 letras.'),
    body('area').isFloat({ min: 1 }).withMessage('El área debe ser un número positivo.'),
    body('population').isInt({ min: 1 }).withMessage('La población debe ser un número entero positivo.'),
    body('gini').isFloat({ min: 0, max: 100 }).withMessage('El índice Gini debe estar entre 0 y 100.'),
    validateCountry
], async (req, res) => {
    const { name, capital, borders, area, population, gini, timezones, creator } = req.body;
    const newCountry = new Country({
        name: { common: name, official: name, nativeName: {} },
        capital: [capital],
        borders: borders.split(','),
        area,
        population,
        gini: { '2019': gini },
        timezones: timezones.split(','),
        creador: creator || 'Ponce Virginia'
    });

    try {
        await newCountry.save();
        res.redirect('/countries/list');  // Redirige a la lista de países
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al guardar el país');
    }
});

export default router;
