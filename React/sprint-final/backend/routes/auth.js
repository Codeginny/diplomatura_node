// routes/auth.js
import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

// Ruta de registro
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;  // Aquí agregamos el rol

    // Verifica si el usuario ya existe
    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ msg: 'Ya existe el usuario' });

    // Creación de un nuevo usuario incluyendo el rol
    const nuevoUsuario = await User.create({ email, password, name, role });

    // Generación de un token JWT
    const token = jwt.sign(
      { userId: nuevoUsuario._id, email: nuevoUsuario.email, role: nuevoUsuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '20d' }
    );

    res.status(201).json({
      msg: 'Usuario registrado con éxito',
      token,  // El token se devuelve para futuras peticiones
      user: { email: nuevoUsuario.email, name: nuevoUsuario.name, role: nuevoUsuario.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ruta de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Verifica si el usuario existe
    const usuario = await User.findOne({ email })
    if (!usuario) return res.status(400).json({ msg: 'Usuario no encontrado' })

    // Compara las contraseñas
    const passwordMatch = await usuario.comparePassword(password)
    if (!passwordMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' })

    // Genera un token JWT
    const token = jwt.sign(
      { userId: usuario._id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '20d' }
    )

    res.status(200).json({
      msg: 'Login exitoso',
      token,  // El token se devuelve para futuras peticiones
      user: { email: usuario.email, name: usuario.name, role: usuario.role }
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
