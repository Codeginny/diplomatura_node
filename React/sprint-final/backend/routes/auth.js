// routes/auth.js
import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Role from '../models/Role.js';
import { auth, admin, hasPermission } from '../middlewares/auth.js';

const router = express.Router();

// Ruta de Registro
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ msg: 'Ya existe el usuario' });
    }

    const roleData = await Role.findById(role);
    if (!roleData) {
      return res.status(400).json({ msg: 'Rol no válido' });
    }

    const nuevoUsuario = await User.create({ email, password, name, role });

    const token = jwt.sign(
      { 
        userId: nuevoUsuario._id, 
        email: nuevoUsuario.email, 
        role: roleData.name 
      },
      process.env.JWT_SECRET,
      { expiresIn: '20d' }
    );

    res.status(201).json({
      msg: 'Usuario registrado con éxito',
      token,
      user: {
        id: nuevoUsuario._id,
        email: nuevoUsuario.email,
        name: nuevoUsuario.name,
        role: roleData.name
      }
    });
  } catch (err) {
    console.error('Error en el registro:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Ruta para obtener los roles
router.get('/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error('Error al obtener roles:', error.message);
    res.status(500).json({ message: 'Error al obtener roles' });
  }
});

// Ruta de Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email }).populate({
      path: 'role',
      populate: { path: 'permissions' }
    });

    if (!usuario) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    const passwordMatch = await usuario.comparePassword(password);
    if (!passwordMatch) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        userId: usuario._id,
        email: usuario.email,
        role: usuario.role.name,
        permissions: usuario.role.permissions.map(p => p.name)
      },
      process.env.JWT_SECRET,
      { expiresIn: '20d' }
    );

    res.status(200).json({
      msg: 'Login exitoso',
      token,
      user: {
        id: usuario._id,
        email: usuario.email,
        name: usuario.name,
        role: usuario.role.name,
        permissions: usuario.role.permissions.map(p => p.name)
      }
    });

  } catch (err) {
    console.error('Error en el login:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Ruta protegida: Panel de administración
router.get('/admin-dashboard', auth, admin, (req, res) => {
  res.status(200).json({ message: 'Bienvenido al panel de administración' });
});


// Ruta protegida: Crear película (con permisos)
router.post('/create-movie', auth, hasPermission('create_movie'), (req, res) => {
  res.status(200).json({ message: 'Permiso concedido para crear una película' });
});


export default router;
