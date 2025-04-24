import axios from 'axios';

// URL de tu MockAPI
const API_URL = 'https://680a8019d5075a76d98835ec.mockapi.io/api/v2/heroes';

// Obtener todos los superhéroes
export const getSuperheroes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los superhéroes', error);
    throw error;
  }
};

// Obtener un superhéroe por ID
export const getSuperheroById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el superhéroe', error);
    throw error;
  }
};

// Crear un nuevo superhéroe
export const createSuperhero = async (superheroData) => {
  try {
    const response = await axios.post(API_URL, superheroData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el superhéroe', error);
    throw error;
  }
};

// Actualizar un superhéroe
export const updateSuperhero = async (id, superheroData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, superheroData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el superhéroe', error);
    throw error;
  }
};

// Eliminar un superhéroe
export const deleteSuperhero = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al eliminar el superhéroe', error);
    throw error;
  }
};
