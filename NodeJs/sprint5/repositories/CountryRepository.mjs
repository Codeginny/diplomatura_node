import Country from '../models/country.js';

const getAllCountries = async () => {
  return await Country.find();
};

const addCountry = async (countryData) => {
  const country = new Country(countryData);
  await country.save();
};

const deleteCountry = async (id) => {
  await Country.findByIdAndDelete(id);
};

export { getAllCountries, addCountry, deleteCountry };
