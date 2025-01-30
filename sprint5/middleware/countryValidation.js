import { body, validationResult } from 'express-validator';

// Reglas de validación para crear/editar un país
export const crearEditarPaisValidationRules = () => [
  body('name')
      .notEmpty().withMessage('El nombre común es obligatorio')
      .isLength({ min: 3, max: 90 }).withMessage('El nombre común debe tener entre 3 y 90 caracteres'),

  body('capital')
      .notEmpty().withMessage('La capital es obligatoria')
      .isArray().withMessage('La capital debe ser un arreglo de nombres de ciudades')
      .custom((value) => {
          if (value.some(item => typeof item !== 'string' || item.length < 3 || item.length > 90)) {
              return false;
          }
          return true;
      }).withMessage('Cada capital debe ser una cadena de entre 3 y 90 caracteres'),

  body('area')
      .notEmpty().withMessage('El área es obligatoria')
      .isNumeric().withMessage('El área debe ser un número')
      .custom(value => value > 0).withMessage('El área debe ser un número positivo'),

  body('population')
      .notEmpty().withMessage('La población es obligatoria')
      .isInt({ min: 1 }).withMessage('La población debe ser un número entero positivo'),

  body('borders')
      .optional()
      .isArray().withMessage('Las fronteras deben ser un arreglo de códigos de país')
      .custom((value) => {
          if (value.some(item => typeof item !== 'string' || item.length !== 3 || !/^[A-Z]+$/.test(item))) {
              return false;
          }
          return true;
      }).withMessage('Las fronteras deben ser un arreglo de códigos de 3 letras mayúsculas')
];


// Middleware de validación
export const validateCountry = (req, res, next) => {
    const errors = validationResult(req);  // Esto obtiene los errores de validación
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    next();  // Si no hay errores, pasa al siguiente middleware o controlador
};
