import { 
    obtenerPaises, 
    agregarPais, 
    obtenerPaisPorId, 
    actualizarPais, 
    eliminarPais, 
    obtenerYAlmacenarPaises, 
    calculateDashboardMetrics // Importamos la función de cálculo
} from '../services/countriesService.mjs';

import Country from '../models/Country.mjs';

// Página de inicio
export const renderHomePage = (req, res) => {
    res.render('inicio', { title: 'Página de Inicio' });
};

// Listar países
export const listCountries = async (req, res) => {
    try {
        const countries = await obtenerPaises();
        if (!countries || countries.length === 0) throw new Error('No se encontraron países en la base de datos');

        // Calcular los totales
        const { totalPopulation, totalArea, avgGini } = calculateDashboardMetrics(countries);

        // Pasar los totales a la vista
        res.render('list', { 
            countries, 
            totalPopulation, 
            totalArea, 
            avgGini: avgGini.toFixed(1), // Asegúrate de que el Gini sea un número con un decimal
            title: 'Lista de Países' 
        });
    } catch (error) {
        console.error('Error al listar países:', error.message);
        res.status(500).render('error', { message: 'Error al listar países.' });
    }
};


// Dashboard de países
export const getDashboard = async (req, res) => {
    try {
        const countries = await Country.find({}, { name: 1, gini: 1, population: 1, area: 1 });

        // Utilizamos la función calculateDashboardMetrics
        const { totalPopulation, totalArea, avgGini } = calculateDashboardMetrics(countries);

        res.render('dashboard', { 
            countries, 
            totalPopulation, 
            avgGini: avgGini.toFixed(1), 
            totalArea, 
            title: 'Dashboard de Países' 
        });
    } catch (error) {
        console.error('Error al obtener el dashboard:', error.message);
        res.status(500).render('error', { message: 'Error al cargar el dashboard.' });
    }
};

// Renderizar la página de agregar país
export const renderAddPage = (req, res) => {
    res.render('add-country', { title: 'Agregar País' });
};

// Agregar un nuevo país
export const addCountry = async (req, res) => {
    try {
        const { capital, borders, gini, ...rest } = req.body;
        const paisData = {
            ...rest,
            capital: capital ? capital.split(',').map(cap => cap.trim()) : [],
            borders: borders ? borders.split(',').map(border => border.trim()) : [],
            gini: gini ? parseFloat(gini) : null,
            creador: req.body.creador || 'Ponce Virginia'
        };

        if (gini < 0 || gini > 100) {
            return res.status(400).render('error', { message: 'El índice Gini debe estar entre 0 y 100.' });
        }

        await agregarPais(paisData);
        req.flash('success', 'País agregado correctamente');
        res.redirect('/countries/list');
    } catch (error) {
        console.error('Error al agregar país:', error.message);
        res.status(400).render('error', { message: 'Error al agregar país.' });
    }
};

// Renderizar la página de edición de un país
export const renderEditPage = async (req, res) => {
    try {
        const country = await obtenerPaisPorId(req.params.id);
        if (!country) return res.status(404).render('error', { message: 'País no encontrado.' });
        res.render('edit-country', { country, title: 'Editar País' });
    } catch (error) {
        console.error('Error al obtener país:', error.message);
        res.status(500).render('error', { message: 'Error al cargar la página de edición.' });
    }
};

// Editar un país existente
export const editCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_common, name_official, capital, area, population, gini, timezones, borders } = req.body;

        if (gini < 0 || gini > 100) {
            return res.status(400).render('error', { message: 'El índice Gini debe estar entre 0 y 100.' });
        }

        const datosActualizados = {
            name: { 
                common: name_common, 
                official: name_official, 
                nativeName: { spa: { official: name_official, common: name_common } } 
            },
            capital: capital ? capital.split(',').map(cap => cap.trim()) : [],
            area: parseFloat(area),
            population: parseInt(population, 10),
            gini: gini ? parseFloat(gini) : null,
            timezones: timezones ? timezones.split(',').map(tz => tz.trim()) : [],
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
    debugger
    console.log(req.params)
    const { id } = req.params; // Obtener el ID del país desde la URL
    try {
        console.log(id)
        const result = await Country.findByIdAndDelete(id); // Eliminar el país de la base de datos
        console.log(result)
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
