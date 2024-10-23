import { getSuperheroesFromFile, saveSuperheroesToFile } from '../repositories/superheroesRepository.mjs';
import { Superhero } from '../models/superheroModel.mjs';

// Obtener todos los superhéroes
export const getAllSuperheroes = async () => {
  return await getSuperheroesFromFile();
};

// Crear un nuevo superhéroe
export const createSuperhero = async (superheroData) => {
  const superheroes = await getSuperheroesFromFile();
  const newSuperhero = new Superhero(
    superheroes.length + 1,
    superheroData.name,
    superheroData.alias,
    superheroData.power,
    superheroData.universe
  );
  superheroes.push(newSuperhero);
  await saveSuperheroesToFile(superheroes);
  return newSuperhero;
};
