// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Función para registrar un nuevo usuario
export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Por favor, completa todos los campos" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Este email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: "Usuario creado con éxito", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al crear el usuario" });
  }
};

// Función de login
export const loginUser = async (req, res) => {
  debugger;
  const { email, password } = req.body;
  console.log('[LOGIN] Datos recibidos:', { email, password });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('[LOGIN] Usuario no encontrado');
      return res.status(400).json({ message: "El correo no está registrado" });
    }

    console.log('[LOGIN] Usuario encontrado:', user);

    const match = await bcrypt.compare(password, user.password);
    console.log('[LOGIN] Contraseña coincide:', match);

    if (!match) {
      console.log('[LOGIN] Contraseña incorrecta');
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    console.log('[LOGIN] Token generado:', token);

    res.status(200).json({ message: "Login exitoso", token });
  } catch (error) {
    console.error('[LOGIN] Error inesperado:', error);
    res.status(500).json({ message: "Hubo un error al iniciar sesión" });
  }
};

