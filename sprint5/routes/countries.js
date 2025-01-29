// routes/countryRoutes.js
import express from 'express';
import * as countriesController from '../controllers/countriesController.js';
import { validateCountry } from '../middleware/countryValidation.js';

const router = express.Router();

//Página de inicio.
router.get('/', countriesController.renderHomePage);

//Listar todos los países.
router.get('/countries/list', countriesController.listCountries);

//Mostrar el dashboard de países.
router.get('/countries/dashboard', countriesController.getDashboard);

//Página para agregar un nuevo país.
router.get('/countries/add', countriesController.renderAddPage);

//Agregar un nuevo país.
router.post('/countries/add', validateCountry, countriesController.addCountry);

// editar un país existente.
router.get('/countries/edit/:id', countriesController.renderEditPage);


//Actualizar un país existente.
router.post('/countries/edit/:id', countriesController.editCountry);

// Ruta para eliminar un país
router.post('/countries/delete/:id', countriesController.deleteCountry);


export default router;
