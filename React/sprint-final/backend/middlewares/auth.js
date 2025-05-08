// middlewares/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido" });
  }
};

export const admin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).populate("role");

    if (!user || user.role.name !== "admin") {
      return res.status(403).json({ message: "Acceso denegado. No eres administrador." });
    }

    next();
  } catch (error) {
    console.error("Error en middleware admin:", error.message);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Middleware hasPermission
export const hasPermission = (permission) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.userId).populate({
        path: "role",
        populate: {
          path: "permissions",
        },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const hasPerm = user.role.permissions.some((perm) => perm.name === permission);

      if (!hasPerm) {
        return res.status(403).json({ message: "Permiso denegado" });
      }

      next();
    } catch (error) {
      console.error("Error al verificar permisos:", error.message);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
};