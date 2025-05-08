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
      role: req.body.isAdmin ? 'admin' : 'user',  // Asignar el rol de admin si isAdmin es true
    });
    
    

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '20d' });

    res.status(201).json({ message: "Usuario creado con éxito", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al crear el usuario" });
  }
};

// Función de login
eexport const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "El correo no está registrado" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '20d' });

    res.status(200).json({ message: user.role === "admin" ? "Admin login successful" : "User login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al iniciar sesión" });
  }
};
