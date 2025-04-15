import axios from 'axios';

const API_URL = '/api/countries';

// Obtener todos los países
export const getCountries = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los países', error);
    throw error;
  }
};

// Obtener un país por ID
export const getCountryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el país', error);
    throw error;
  }
};

// Crear un nuevo país
export const createCountry = async (countryData) => {
  try {
    const response = await axios.post(API_URL, countryData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el país', error);
    throw error;
  }
};

// Actualizar un país
export const updateCountry = async (id, countryData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, countryData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el país', error);
    throw error;
  }
};

// Eliminar un país
export const deleteCountry = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al eliminar el país', error);
    throw error;
  }
};
