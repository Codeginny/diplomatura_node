import Hero from '../models/SuperHero.mjs';

// Obtener lista de superhéroes
export const obtenerTodosLosSuperHeroController = async (req, res) => {
  try {
    const heroes = await Hero.find(); // Encuentra todos los superhéroes
    res.render('/heroes/list', { title: 'Lista de Superhéroes', heroes });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error del servidor', error });
  }
};

// Formulario de agregar o editar héroe
export const obtenerSuperheroePorIdController = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const hero = await Hero.findById(id); // Busca un héroe por ID
      res.render('new', { title: 'Editar Superhéroe', hero });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { title: 'Error del servidor', error });
    }
  } else {
    res.render('new', { title: 'Agregar Superhéroe', hero: null }); // Pasar hero: null cuando no es edición
  }
};


// Agregar nuevo héroe
export const agregarSuperHeroeController = async (req, res) => {
  console.log(req.body); // Depuración
  const {
    nombreSuperHeroe,
    nombreReal,
    nombreSociedad,
    edad,
    planetaOrigen,
    debilidad,
    poder,
    habilidadEspecial,
    aliado,
    enemigo
  } = req.body;

  try {
    const nuevoHeroe = new Hero({
      nombreSuperHeroe,
      nombreReal,
      nombreSociedad,
      edad,
      planetaOrigen,
      debilidad,
      poder: poder ? poder.split(',').map(p => p.trim()) : [],
      habilidadEspecial, // Este campo debe llegar con valor
      aliado: aliado ? aliado.split(',').map(a => a.trim()) : [],
      enemigo: enemigo ? enemigo.split(',').map(e => e.trim()) : []
    });

    await nuevoHeroe.save();
    res.redirect('/heroes/list');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error del servidor', error });
  }
};

// Editar héroe
export const editarSuperheroeController = async (req, res) => {
  const { id } = req.params;
  const {
    nombreSuperHeroe,
    nombreReal,
    nombreSociedad,
    edad,
    planetaOrigen,
    debilidad,
    poder,
    habilidadEspecial,
    aliado,
    enemigo,
  } = req.body;

  try {
    const poderArray = poder ? poder.split(',').map(p => p.trim()) : [];
    const aliadoArray = aliado ? aliado.split(',').map(a => a.trim()) : [];
    const enemigoArray = enemigo ? enemigo.split(',').map(e => e.trim()) : [];

    await Hero.findByIdAndUpdate(id, {
      nombreSuperHeroe,
      nombreReal,
      nombreSociedad,
      edad,
      planetaOrigen,
      debilidad,
      poder: poderArray,
      habilidadEspecial,
      aliado: aliadoArray,
      enemigo: enemigoArray,
    });

    res.redirect('/heroes/list');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error del servidor', error });
  }
};


// Eliminar héroe
export const eliminarSuperheroeController = async (req, res) => {
  const { id } = req.params;
  try {
    await Hero.findByIdAndDelete(id);
    res.redirect('/heroes/list');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { title: 'Error del servidor', error });
  }
};
