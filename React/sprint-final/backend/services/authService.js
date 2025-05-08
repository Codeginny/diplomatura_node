// services/authService.js

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Role from "../models/Role.js";

class AuthService {
  // Método para registrar un nuevo usuario
  async register(userData) {
    const existingUser = await User.findOne({
      $or: [{ email: userData.email }, { username: userData.username }]
    });

    if (existingUser) {
      throw new Error("Usuario o email ya existe");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const roleName = userData.isAdmin ? "admin" : "user";
    const role = await Role.findById(userRole).populate("permissions");

    
    if (!role) {
      throw new Error("Rol no encontrado");
    }

    const user = new User({
      ...userData,
      password: hashedPassword,
      role: role._id
    });

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;

    const token = this.generateToken(user);

    return { user: userResponse, token };
  }

  // Método para iniciar sesión
  async login(email, password) {
    const user = await User.findOne({ email }).populate("role");
    console.log(user);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Contraseña incorrecta");
    }

    const userResponse = user.toObject();
    delete userResponse.password;

    const token = this.generateToken(user);

    return { user: userResponse, token };
  }

  // Método para obtener todos los roles
  async getRoles() {
    try {
      const roles = await Role.find().populate("permissions");
      return roles;
    } catch (error) {
      throw new Error("Error al obtener roles");
    }
  }

  // Método auxiliar para generar tokens JWT
  generateToken(user) {
    return jwt.sign(
      {
        id: user._id,
        role: user.role.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
  }
}

export default new AuthService();
