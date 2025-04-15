import axios from 'axios';
import mongoose from 'mongoose';
import { Country } from '../models/Country.js'; // Asegúrate de que el modelo esté bien importado

// Función para obtener países de la API y guardarlos en la base de datos
const getCountriesFromAPI = async () => {
    try {
        console.log('🔄 Iniciando la obtención de países desde la API...');

        // Hacemos la solicitud para obtener todos los países
        const response = await axios.get('https://restcountries.com/v3.1/all', { timeout: 60000 });
        const countries = response.data;
        
        console.log(`✅ Datos recibidos: ${countries.length} países encontrados.`);

        // Filtrar países que tienen español como idioma
        const spanishSpeakingCountries = countries.filter(country => 
            country.languages && country.languages.spa
        );

        console.log(`🌎 Países hispanohablantes encontrados: ${spanishSpeakingCountries.length}`);

        // Adecuar los datos al modelo
        const countriesToSave = spanishSpeakingCountries.map(country => {
            const officialNameSpa = country.name.nativeName?.spa?.official || country.name.official;
            
            console.log(`📍 Procesando: ${officialNameSpa}`);

            return {
                name: { 
                    official: officialNameSpa,  
                    common: country.name.common 
                },
                capital: country.capital || ['Sin Capital'],
                borders: country.borders || [],
                area: country.area || 0,
                population: country.population || 0,
            };
        });

        console.log('📋 Lista de países listos para guardar en la base de datos:', countriesToSave);

        // Guardar en la base de datos sin duplicados
        for (const country of countriesToSave) {
            const existingCountry = await Country.findOne({ 'name.official': country.name.official });
            if (!existingCountry) {
                await Country.create(country);
                console.log(`✅ País guardado: ${country.name.official}`);
            } else {
                console.log(`⚠️ País ya existente en la base de datos: ${country.name.official}`);
            }
        }

        console.log('🎉 Proceso de guardado completado.');
    } catch (error) {
        console.error('❌ Error al obtener los países:', error);
    }
};

// Conectar a MongoDB y ejecutar la función
mongoose.connect('mongodb+srv://Grupo-04:grupo04@cursadanodejs.ls9ii.mongodb.net/Node-js', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('✅ Conexión a MongoDB exitosa.');
        getCountriesFromAPI(); // Llamar a la función para obtener y guardar los países
    })
    .catch(err => {
        console.error('❌ Error de conexión a MongoDB:', err);
    });
