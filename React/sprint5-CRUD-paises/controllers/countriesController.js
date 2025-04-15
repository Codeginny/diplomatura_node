import Country from "../backend/models/Country.mjs";
import { validationResult } from "express-validator"; // Para validación de datos

// Obtener todos los países
export const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los países", error });
  }
};

// Obtener un país por su ID
export const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;
    const country = await Country.findById(id);
    if (!country) {
      return res.status(404).json({ message: "País no encontrado" });
    }
    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el país", error });
  }
};

// Crear un nuevo país
export const createCountry = async (req, res) => {
  // Validación de errores con express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, capital, population, region } = req.body;

  try {
    const newCountry = new Country({
      name,
      capital,
      population,
      region,
    });
    await newCountry.save();
    res.status(201).json(newCountry);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el país", error });
  }
};

// Editar un país
export const updateCountry = async (req, res) => {
  const { id } = req.params;
  const { name, capital, population, region } = req.body;

  try {
    const updatedCountry = await Country.findByIdAndUpdate(
      id,
      { name, capital, population, region },
      { new: true }
    );
    if (!updatedCountry) {
      return res.status(404).json({ message: "País no encontrado" });
    }
    res.status(200).json(updatedCountry);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el país", error });
  }
};

// Eliminar un país
export const deleteCountry = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCountry = await Country.findByIdAndDelete(id);
    if (!deletedCountry) {
      return res.status(404).json({ message: "País no encontrado" });
    }
    res.status(200).json({ message: "País eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el país", error });
  }
};
