import { body, validationResult } from 'express-validator';

// Reglas de validación para crear/editar un país
export const crearEditarPaisValidationRules = () => [
    body('name_common')
      .notEmpty().withMessage('El nombre común es obligatorio')
      .isLength({ min: 3, max: 90 }).withMessage('El nombre común debe tener entre 3 y 90 caracteres'),
  
    body('name_official')
      .notEmpty().withMessage('El nombre oficial es obligatorio')
      .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres'),
  
    body('capital')
      .notEmpty().withMessage('La capital es obligatoria')
      .custom((value) => {
        // Asegúrate de que 'capital' sea un arreglo de entre 3 y 90 caracteres por cada capital
        const capitals = Array.isArray(value) ? value : value.split(',').map(cap => cap.trim());
        if (!Array.isArray(capitals)) {
          return false;
        }
        return capitals.every(cap => cap.length >= 3 && cap.length <= 90);
      }).withMessage('La capital debe ser un arreglo de entre 3 y 90 caracteres por cada capital'),
  
    body('area')
      .notEmpty().withMessage('El área es obligatoria')
      .isNumeric().withMessage('El área debe ser un número')
      .custom(value => value > 0).withMessage('El área debe ser un número positivo'),
  
    body('population')
      .notEmpty().withMessage('La población es obligatoria')
      .isInt({ min: 1 }).withMessage('La población debe ser un número entero positivo'),
  
      body('gini')
      .optional()
      .custom((value) => {
        if (typeof value !== 'object' || value === null) return false;
        return Object.values(value).every(num => typeof num === 'number' && num >= 0 && num <= 100);
      }).withMessage('El índice Gini debe ser un mapa con valores numéricos entre 0 y 100'),
    
  
    body('timezones')
      .notEmpty().withMessage('Las zonas horarias son obligatorias'),
  
    body('borders')
      .optional()
      .custom((value) => {
        if (!value) return true; // Si no hay fronteras, es válido
        const borders = Array.isArray(value) ? value : value.split(',').map(border => border.trim());
        if (!Array.isArray(borders)) {
          return false;
        }
        return borders.every(border => border.length === 3 && /^[A-Z]+$/.test(border));
      }).withMessage('Las fronteras deben ser un arreglo de códigos de 3 letras mayúsculas')
  ];

  
  
// Middleware para validar errores
export const validar = (req, res, next) => {
  const errors = validationResult(req); // Recolecta los errores generados por las validaciones anteriores.
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // Si no hay errores, pasa al siguiente middleware o manejador usando next().
};

// Exportar las reglas de validación como una función para su uso
export const validateCountry = (req, res, next) => {
  // Aplica las reglas de validación y luego maneja los errores
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // No hay errores, continúa con la lógica
};

export default validateCountry;
