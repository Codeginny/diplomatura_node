import { getAllSuperheroes, createSuperhero } from '../services/superheroesService.mjs';

// Obtener todos los superhéroes
export const getSuperheroes = async (req, res) => {
  try {
    const superheroes = await getAllSuperheroes();
    res.status(200).json(superheroes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo superhéroe
export const addSuperhero = async (req, res) => {
  try {
    const superhero = await createSuperhero(req.body);
    res.status(201).json(superhero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
