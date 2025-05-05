// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Usamos bcryptjs en lugar de bcrypt para mantener la consistencia con el resto del código

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }, // Hacerlo obligatorio
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
});

// Método para comparar la contraseña ingresada con la encriptada
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Exportar el modelo
const User = mongoose.model('User', userSchema);
export default User;
