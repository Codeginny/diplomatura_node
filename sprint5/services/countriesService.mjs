import Country from '../models/Country.mjs';

export const obtenerPaises = async () => {
  try {
    const paises = await Country.find();  // Utiliza el modelo correcto
    return paises;
  } catch (error) {
    console.error('Error al obtener los países:', error);
    throw new Error('Error al obtener los países');
  }
};

export const agregarPais = async (paisData) => {
  try {
    const pais = new Country(paisData);
    await pais.save();
    return pais;
  } catch (error) {
    console.error('Error al agregar el país:', error);
    throw new Error('Error al agregar el país');
  }
};
