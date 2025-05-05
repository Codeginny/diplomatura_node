// models/Profile.js
import mongoose from 'mongoose';

// Definir el esquema del perfil
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  watchlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }]
}, { timestamps: true });

// Exportar el modelo
const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
