// scripts/createRoles.js
import mongoose from "mongoose";
import Role from "../models/Role.js";

const createRoles = async () => {
  try {
    const roles = ["user", "admin"];
    for (const roleName of roles) {
      const existingRole = await Role.findOne({ name: roleName });
      if (!existingRole) {
        await Role.create({ name: roleName });
        console.log(`Role ${roleName} creado.`);
      }
    }
    console.log("Roles inicializados.");
  } catch (error) {
    console.error("Error creando roles:", error);
  } finally {
    mongoose.connection.close();
  }
};

export default createRoles;
