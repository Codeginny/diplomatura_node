// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Role from "../models/Role.js";
import "../db.js";

dotenv.config();

const seedRoles = async () => {
  try {
    const roles = ["admin", "user"];

    for (const roleName of roles) {
      const existingRole = await Role.findOne({ name: roleName });
      if (!existingRole) {
        await Role.create({ name: roleName });
        console.log(`Role ${roleName} creado`);
      }
    }

    console.log("Roles creados");
    process.exit();
  } catch (error) {
    console.error("Error al crear roles:", error);
    process.exit(1);
  }
};

seedRoles();
