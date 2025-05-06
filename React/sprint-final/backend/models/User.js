// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // Usamos bcryptjs por compatibilidad y facilidad

// Definir el esquema del usuario
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

// Método para comparar la contraseña ingresada con la almacenada
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Exportar el modelo
const User = mongoose.model('User', userSchema);
export default User;
