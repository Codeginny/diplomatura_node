import { 
    obtenerPaises, 
    agregarPais, 
    obtenerPaisPorId, 
    actualizarPais, 
    eliminarPais, 
    obtenerYAlmacenarPaises, 
    calculateDashboardMetrics
} from '../services/countriesService.mjs';

import { validationResult } from 'express-validator';
import Country from '../models/Country.mjs';

// Página de inicio
export const renderHomePage = (req, res) => {
    res.render('inicio', { title: 'Página de Inicio' });
};

// Listar países
export const listCountries = async (req, res) => {
    try {
        const countries = await obtenerPaises();
        if (!countries.length) throw new Error('No se encontraron países.');
        
        const { totalPopulation, totalArea } = calculateDashboardMetrics(countries);
        res.render('list', { countries, totalPopulation, totalArea, title: 'Lista de Países' });
    } catch (error) {
        console.error('Error al listar países:', error.message);
        res.status(500).render('error', { message: 'Error al listar países.' });
    }
};

// Dashboard de países
export const getDashboard = async (req, res) => {
    try {
        const countries = await Country.find({}, { name: 1, population: 1, area: 1 });
        const { totalPopulation, totalArea } = calculateDashboardMetrics(countries);
        res.render('dashboard', { countries, totalPopulation, totalArea, title: 'Dashboard de Países' });
    } catch (error) {
        console.error('Error al obtener el dashboard:', error.message);
        res.status(500).render('error', { message: 'Error al cargar el dashboard.' });
    }
};

// Página para agregar un nuevo país
export const renderAddPage = (req, res) => {
    res.render('add', { title: 'Agregar País' });
};

// Agregar un nuevo país
export const addCountry = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('add', { errors: errors.array(), title: 'Agregar País' });
        }

        const { name, capital, borders, area, population } = req.body;
        const country = new Country({
            name,
            capital: Array.isArray(capital) ? capital : [capital],
            borders: borders ? (Array.isArray(borders) ? borders : [borders]) : [],
            area,
            population
        });

        await country.save();
        req.flash('success', 'País agregado correctamente');
        res.redirect('/countries/list');
    } catch (error) {
        console.error('Error al agregar país:', error.message);
        res.status(500).render('error', { message: 'Error al agregar país.' });
    }
};

// Página para editar un país
export const renderEditPage = async (req, res) => {
    try {
        const country = await obtenerPaisPorId(req.params.id);
        if (!country) return res.status(404).render('error', { message: 'País no encontrado.' });

        res.render('edit', { country, title: 'Editar País' });
    } catch (error) {
        console.error('Error al cargar el formulario de edición:', error.message);
        res.status(500).render('error', { message: 'Error al cargar el formulario de edición.' });
    }
};

// Editar un país existente
export const editCountry = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('edit', { errors: errors.array(), title: 'Editar País' });
        }

        const { id } = req.params;
        const { name_common, name_official, capital, area, population, borders } = req.body;

        const datosActualizados = {
            name: { common: name_common, official: name_official },
            capital: capital ? capital.split(',').map(cap => cap.trim()) : [],
            area: parseFloat(area),
            population: parseInt(population, 10),
            borders: borders ? borders.split(',').map(border => border.trim()) : [],
        };

        const paisActualizado = await actualizarPais(id, datosActualizados);
        if (paisActualizado) {
            req.flash('success', 'País actualizado correctamente');
            res.redirect('/countries/list');
        } else {
            res.status(404).render('error', { message: 'País no encontrado.' });
        }
    } catch (error) {
        console.error('Error al actualizar país:', error.message);
        res.status(500).render('error', { message: 'Error al actualizar país.' });
    }
};

// Eliminar un país
export const deleteCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await eliminarPais(id);
        if (!result) {
            return res.status(404).send('No se encontró el país para eliminar');
        }
        res.status(200).send('País eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el país:', error);
        res.status(500).send('Error al eliminar el país');
    }
};

// Consumir API y almacenar países
export const fetchAndStoreCountries = async (req, res) => {
    try {
        await obtenerYAlmacenarPaises();
        req.flash('success', 'Países almacenados correctamente');
        res.redirect('/countries/list');
    } catch (error) {
        console.error('Error al almacenar países:', error.message);
        res.status(500).render('error', { message: 'Error al almacenar países.' });
    }
};
