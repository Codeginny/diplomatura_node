import { obtenerPaises, agregarPais, obtenerPaisPorId, actualizarPais, eliminarPais } from '../services/countryService.js';

export const getDashboard = async (req, res) => {
    try {
        const countries = await obtenerPaises(); // Cambié de obtenerTodosLosPaises a obtenerPaises
        const totalPopulation = countries.reduce((acc, country) => acc + country.population, 0);
        const avgGini = countries.reduce((acc, country) => acc + country.gini, 0) / countries.length; // Aquí ya tomamos el valor de gini directamente como un número
        const totalArea = countries.reduce((acc, country) => acc + country.area, 0);
        
        res.render('dashboard', { 
            countries, 
            totalPopulation, 
            avgGini, 
            totalArea 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Algo salió mal, por favor intenta más tarde');
    }
};

// Agregar un país
export const addCountry = async (req, res) => {
    try {
        const { capital, borders, gini, ...rest } = req.body;
        
        // Convertir capital y borders a arreglos si es necesario
        if (capital) {
            req.body.capital = capital.split(',').map(cap => cap.trim());
        }
        if (borders) {
            req.body.borders = borders.split(',').map(border => border.trim());
        }

        // Asegurarse de que el índice Gini esté entre 0 y 100
        if (gini < 0 || gini > 100) {
            return res.status(400).render('error', { message: 'El índice Gini debe estar entre 0 y 100.' });
        }

        req.body.gini = parseFloat(gini);  // Convertir a número si es necesario
        
        await agregarPais(req.body);
        res.redirect('/countries');
    } catch (error) {
        console.error("Error al agregar el país:", error);
        res.status(400).render('error', { message: 'Error al agregar país' });
    }
};

// Obtener un país por ID para mostrar en la vista de edición
export const getCountryById = async (req, res) => {
    try {
        const { id } = req.params;
        const country = await obtenerPaisPorId(id);

        if (country) {
            res.render('editCountry', { title: 'Editar País', country });
        } else {
            res.status(404).send({ message: "País no encontrado" });
        }
    } catch (error) {
        console.error("Error al obtener el país:", error);
        res.status(500).send({ message: "Error al obtener el país" });
    }
};

// Editar un país
export const editCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const { name_common, name_official, capital, area, population, gini, timezones, borders } = req.body;

        // Convertir "capital" y "borders" a arreglos, si no lo son
        const capitalArray = capital ? capital.split(',').map(cap => cap.trim()) : [];
        const bordersArray = borders ? borders.split(',').map(border => border.trim()) : [];

        // Validar que el índice Gini esté dentro del rango permitido
        if (gini < 0 || gini > 100) {
            return res.status(400).render('error', { message: 'El índice Gini debe estar entre 0 y 100.' });
        }

        const datosActualizados = {
            name: {
                common: name_common,
                official: name_official,
                nativeName: {
                    spa: {
                        official: name_official,
                        common: name_common
                    }
                }
            },
            capital: capitalArray,
            area,
            population,
            gini: parseFloat(gini),  // Guardar el índice Gini como número
            timezones: timezones.split(',').map(tz => tz.trim()),
            borders: bordersArray
        };

        // Ahora actualiza el país en la base de datos
        const paisActualizado = await actualizarPais(id, datosActualizados);

        if (paisActualizado) {
            req.flash('success', 'País actualizado correctamente');
            res.redirect('/countries');
        } else {
            res.status(404).send({ message: "País no encontrado" });
        }
    } catch (error) {
        console.error("Error al actualizar el país:", error);
        res.status(500).send({ message: "Error al actualizar el país" });
    }
};

// Eliminar un país
export const deleteCountry = async (req, res) => {
    try {
        const { id } = req.params;
        const paisEliminado = await eliminarPais(id);

        if (paisEliminado) {
            req.flash('success', 'País eliminado correctamente');
            res.redirect('/countries');
        } else {
            res.status(404).send({ message: "País no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar el país:", error);
        res.status(500).send({ message: "Error al eliminar el país" });
    }
};

// Consumir la API y almacenar los países hispanohablantes en la base de datos
export const fetchAndStoreCountries = async (req, res) => {
    try {
        await fetchAndStoreCountries();
        req.flash('success', 'Países hispanohablantes almacenados correctamente');
        res.redirect('/countries');
    } catch (error) {
        console.error("Error al almacenar los países:", error);
        res.status(500).send({ message: "Error al almacenar los países" });
    }
};
