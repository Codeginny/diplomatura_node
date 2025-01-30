// services/countriesService.mjs

import Country from '../models/Country.mjs';

// Obtener todos los países
export const obtenerPaises = async () => {
  try {
    const paises = await Country.find(); // Obtiene todos los países
    return paises;
  } catch (error) {
    console.error('Error al obtener los países:', error);
    throw new Error('Error al obtener los países');
  }
};

// Obtener un país por su ID
export const obtenerPaisPorId = async (id) => {
  try {
    const pais = await Country.findById(id); // Busca un país por su ID
    return pais;
  } catch (error) {
    console.error('Error al obtener el país por ID:', error);
    throw new Error('Error al obtener el país');
  }
};

// Agregar un nuevo país
export const agregarPais = async (paisData) => {
  try {
    const nuevoPais = new Country(paisData); // Crea un nuevo objeto país con los datos proporcionados
    await nuevoPais.save(); // Guarda el nuevo país en la base de datos
  } catch (error) {
    console.error('Error al agregar país:', error);
    throw new Error('Error al agregar el país');
  }
};

// Actualizar los datos de un país
export const actualizarPais = async (id, paisData) => {
  try {
    const paisActualizado = await Country.findByIdAndUpdate(id, paisData, { new: true }); // Actualiza el país por su ID
    return paisActualizado;
  } catch (error) {
    console.error('Error al actualizar país:', error);
    throw new Error('Error al actualizar el país');
  }
};

// Eliminar un país por su ID
export const eliminarPais = async (id) => {
  try {
      // Busca y elimina el país por su id
      const paisEliminado = await Country.findByIdAndDelete(id);
      return paisEliminado;
  } catch (error) {
      console.error('Error al eliminar el país:', error.message);
      throw new Error('No se pudo eliminar el país');
  }
};

// Obtener y almacenar países desde una API o fuente externa
export const obtenerYAlmacenarPaises = async () => {
  try {
    // Aquí iría la lógica para consumir una API o fuente externa de países
    // Suponiendo que ya tienes un servicio para eso
    const paisesExternos = await fetchPaisesDesdeAPI(); // Llama a una función para obtener los países
    for (const pais of paisesExternos) {
      await agregarPais(pais); // Guarda cada país obtenido en la base de datos
    }
  } catch (error) {
    console.error('Error al obtener y almacenar países:', error);
    throw new Error('Error al obtener y almacenar países');
  }
};

// Calcular las métricas del dashboard (Población total, Área total)
export const calculateDashboardMetrics = (countries) => {
  const totalPopulation = countries.reduce((acc, country) => acc + (country.population || 0), 0);
  const totalArea = countries.reduce((acc, country) => acc + (country.area || 0), 0);
  return { totalPopulation, totalArea };
};

