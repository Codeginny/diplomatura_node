import express from 'express';
import {
    renderHomePage,
    listCountries,
    getDashboard,
    renderAddPage,
    addCountry,
    renderEditPage,
    editCountry,
    deleteCountry,
    fetchAndStoreCountries
} from '../controllers/countriesController.js';

import { validateCountry } from '../middleware/countryValidation.js';


const router = express.Router();

// Página de inicio
router.get('/', renderHomePage);

// Listar todos los países
router.get('/countries/list', listCountries);

// Mostrar el dashboard de países
router.get('/countries/dashboard', getDashboard);

// Página para agregar un nuevo país
router.get('/countries/add', renderAddPage);

// Agregar un nuevo país con validación
router.post('/countries/add', validateCountry, addCountry);

// Página para editar un país existente
router.get('/countries/edit/:id', renderEditPage);

// Actualizar un país existente
router.post('/countries/edit/:id', validateCountry, editCountry);

// Eliminar un país
router.post('/countries/delete/:id', deleteCountry);

// Ruta para consumir API y almacenar países
router.get('/countries/fetch', fetchAndStoreCountries);

export default router;
