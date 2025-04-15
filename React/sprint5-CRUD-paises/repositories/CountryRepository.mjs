import Country from '../models/Country.mjs';

// Obtener todos los países
const getAllCountries = async () => {
  return await Country.find();
};

// Agregar un nuevo país
const addCountry = async (countryData) => {
  const country = new Country(countryData);
  await country.save();
};

// Eliminar un país por ID
const deleteCountry = async (id) => {
  await Country.findByIdAndDelete(id);
};

export { getAllCountries, addCountry, deleteCountry };
