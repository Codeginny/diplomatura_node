import { body } from "express-validator";

// Validación para crear y editar un país
export const validateCountry = [
  body("name")
    .notEmpty().withMessage("El nombre del país es obligatorio")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),
  
  body("capital")
    .notEmpty().withMessage("La capital es obligatoria")
    .isLength({ min: 3 }).withMessage("La capital debe tener al menos 3 caracteres"),

  body("population")
    .notEmpty().withMessage("La población es obligatoria")
    .isNumeric().withMessage("La población debe ser un número"),

  body("region")
    .notEmpty().withMessage("La región es obligatoria")
    .isLength({ min: 3 }).withMessage("La región debe tener al menos 3 caracteres")
];
