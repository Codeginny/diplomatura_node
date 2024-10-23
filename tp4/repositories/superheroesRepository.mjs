import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const dataPath = path.resolve('superheroes.json');

// Obtener todos los superhéroes del archivo
export const getSuperheroesFromFile = async () => {
  const data = await readFile(dataPath, 'utf-8');
  return JSON.parse(data);
};

// Guardar superhéroes en el archivo
export const saveSuperheroesToFile = async (superheroes) => {
  await writeFile(dataPath, JSON.stringify(superheroes, null, 2), 'utf-8');
};
