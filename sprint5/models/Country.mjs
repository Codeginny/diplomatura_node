import mongoose from 'mongoose'; // Importación correcta de mongoose

// Definir el esquema de Country
const CountrySchema = new mongoose.Schema({
  name: {
    common: { type: String, required: true },
    official: { type: String, required: true },
    nativeName: {
      spa: {
        official: { type: String },
        common: { type: String }
      }
    }
  },
  capital: [String],
  area: { type: Number, required: true },
  population: { type: Number, required: true },
  gini: {
    type: Number,
    min: 0,     // Gini debe ser entre 0 y 100
    max: 100,   // Gini debe ser entre 0 y 100
    required: true
  },
  timezones: [String],
  borders: [String],
  creador: { type: String, default: 'Virginia Alejandra Ponce' },
  // Añadir más campos si es necesario
});

// Crear el modelo
const Country = mongoose.model('Grupo-04', CountrySchema, 'Grupo-04');

// Exportar el modelo
export default Country;
