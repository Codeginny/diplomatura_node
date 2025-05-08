// controllers/userController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Registro de un usuario
export const register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    console.log("Registro de usuario:", req.body);

    // Verifica si el email ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Crea un nuevo usuario
    const newUser = new User({ email, password, name, role });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error en el registro:", error.message);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

// Login de un usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate("role", "name");
    
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role.name },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, user });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};


// Obtener datos del usuario autenticado
export const getUser = async (req, res) => {
  try {
    console.log("Request - Verificando usuario con ID:", req.user.id);  // Log para verificar el ID del usuario en la solicitud

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      console.log("Error - Usuario no encontrado con el ID:", req.user.id);  // Log si el usuario no se encuentra
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log("Usuario recuperado:", user);  // Log para ver qué usuario se devuelve

    res.status(200).json(user);  // Asegúrate de que el usuario incluye el campo 'role' en el objeto
  } catch (error) {
    console.error("Error al obtener el usuario:", error.message);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

// Obtener todos los usuarios (solo accesible para administradores)
export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Acceso denegado. Solo administradores pueden ver todos los usuarios." });
    }

    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error.message);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

// Actualizar datos de un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "No tienes permisos para modificar este usuario." });
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select("-password");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar usuario:", error.message);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

// Eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (req.user.role !== "admin" && req.user.id !== id) {
      return res.status(403).json({ message: "No tienes permisos para eliminar este usuario." });
    }

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error.message);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};
