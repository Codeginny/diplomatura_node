import axios from 'axios';
import mongoose from 'mongoose';
import { Country } from '../models/Country.js'; // Asegúrate de que el modelo esté bien importado

// Función para obtener países de la API y guardarlos en la base de datos
const getCountriesFromAPI = async () => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all', { timeout: 60000 });
        const countries = response.data;

        // Filtrar países que tengan español como idioma
        const spanishSpeakingCountries = countries.filter(country => 
            country.languages && Object.values(country.languages).includes('spanish')
        );

        // Adecuar los países a los requerimientos del práctico
        const countriesToSave = spanishSpeakingCountries.map(country => ({
            name: { official: country.name.official, common: country.name.common },
            capital: country.capital || ['Sin Capital'],
            borders: country.borders || [],
            area: country.area || 0,
            population: country.population || 0,
            gini: country.gini || { '2019': 0 },
            gini: country.gini || 0, 
            timezones: country.timezones || ['UTC'],
            creador: 'Virginia Ponce',
        }));

        // Guardar los países en la base de datos sin duplicados
        for (const country of countriesToSave) {
            const existingCountry = await Country.findOne({ 'name.common': country.name.common });
            if (!existingCountry) {
                await Country.create(country);
            }
        }

        console.log('Países con idioma español guardados exitosamente');
    } catch (error) {
        console.error('Error al obtener los países:', error);
    }
};

// Conectar a MongoDB
mongoose.connect('mongodb+srv://Grupo-04:grupo04@cursadanodejs.ls9ii.mongodb.net/Node-js', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión a MongoDB exitosa');
        getCountriesFromAPI(); // Llamar a la función para obtener y guardar los países
    })
    .catch(err => {
        console.error('Error de conexión a MongoDB:', err);
    });
