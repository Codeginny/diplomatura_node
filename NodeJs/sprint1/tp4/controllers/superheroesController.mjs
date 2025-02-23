// controllers/superheroesController.mjs

import {
  obtenerSuperheroePorId,
  buscarSuperheroesPorAtributo,
  obtenerSuperheroesMayoresDe30,
  obtenerSuperheroesMenores18Planeta
} from '../services/superheroesService.mjs';

import {
  renderizarSuperheroe,
  renderizarListaSuperheroes
} from '../views/responseView.mjs';

export function obtenerSuperheroePorIdController(req, res) {
  const { id } = req.params;
  const superheroe = obtenerSuperheroePorId(parseInt(id));

  if (superheroe) {
    res.send(renderizarSuperheroe(superheroe));
  } else {
    res.status(404).send({ mensaje: "Superhéroe no encontrado" });
  }
}

export function buscarSuperheroesPorAtributoController(req, res) {
  const { atributo, valor } = req.params;
  const superheroes = buscarSuperheroesPorAtributo(atributo, valor);

  if (superheroes.length > 0) {
    res.send(renderizarListaSuperheroes(superheroes));
  } else {
    res.status(404).send({ mensaje: "No se encontraron superhéroes con ese atributo" });
  }
}
export function obtenerSuperheroesMayoresDe30Controller(req, res) {
  const { planeta } = req.params;
  const superheroes = obtenerSuperheroesMayoresDe30(planeta);
  res.send(renderizarListaSuperheroes(superheroes));
}


export function obtenerSuperheroesMenores18PlanetaController(req, res) {
  const { planeta } = req.params;
  const superheroes = obtenerSuperheroesMenores18Planeta(planeta);
  res.send(renderizarListaSuperheroes(superheroes));
}
