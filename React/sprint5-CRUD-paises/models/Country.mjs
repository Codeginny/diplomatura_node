import mongoose from 'mongoose';

// Esquema de Country
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
  borders: [String],
});

// Crear el modelo
const Country = mongoose.model('Country', CountrySchema, 'countries');

// Exportar el modelo
export default Country;
