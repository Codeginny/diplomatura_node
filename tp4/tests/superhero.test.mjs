import { expect } from 'chai';
import { getAllSuperheroes } from '../services/superheroesService.mjs';

describe('Superhero Service', () => {
  it('Debería devolver un array de superhéroes', async () => {
    const superheroes = await getAllSuperheroes();
    expect(superheroes).to.be.an('array');
  });
});
