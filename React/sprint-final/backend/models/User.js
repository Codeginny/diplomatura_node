// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Usamos bcryptjs por compatibilidad y facilidad

// Definir el esquema del usuario
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',  // Valor por defecto para los usuarios comunes
  },
});

// Middleware para encriptar la contraseña antes de guardar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();  // Solo encripta si la contraseña ha sido modificada

  try {
    const hash = await bcrypt.hash(this.password, 10);  // Encripta la contraseña con bcrypt
    this.password = hash;  // Asigna el hash en lugar de la contraseña original
    next();  // Continúa con la operación de guardado
  } catch (err) {
    next(err);  // Si hay un error, pasa el error al siguiente middleware
  }
});

// Método para comparar la contraseña ingresada con la almacenada
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);  // Compara la contraseña ingresada con la almacenada
};

// Exportar el modelo
const User = mongoose.model('User', UserSchema);
export default User;
