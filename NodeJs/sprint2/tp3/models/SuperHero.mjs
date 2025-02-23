// src/models/SuperHero.mjs
import mongoose from 'mongoose';

const superheroSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  nombreSuperHeroe: { type: String, required: true },
  nombreReal: { type: String, required: true },
  edad: { type: Number, min: 0 },
  planetaOrigen: { type: String, default: 'Desconocido' },
  debilidad: String,
  poderes: [String],
  aliados: [String],
  enemigos: [String],
  createdAt: { type: Date, default: Date.now },
}, { collection: 'Grupo-04' });

export default mongoose.model('Grupo-04', superheroSchema);
