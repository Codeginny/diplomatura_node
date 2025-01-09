import express from 'express';
import SuperHero from '../models/SuperHero.mjs';
import { agregarSuperHeroeController, obtenerSuperheroePorIdController } from '../controllers/superHeroController.mjs';

const router = express.Router();

// Middleware de depuración
router.use((req, res, next) => {
  console.log(`Solicitud entrante: ${req.method} ${req.url}`);
  next();
});

// Lista de héroes
router.get('/heroes/list', async (req, res) => {
  try {
    const heroes = await SuperHero.find();
    res.render('list', { title: 'Lista de Superhéroes', heroes });
  } catch (err) {
    res.status(500).render('error', { title: 'Error', error: err.message });
  }
});

// Formulario de creación
router.get('/heroes/new', (req, res) => {
  res.render('new', { title: 'Agregar Héroe' });
});

// Crear un héroe
router.post('/heroes', agregarSuperHeroeController);

// Editar héroe
router.get('/heroes/:id/edit', async (req, res) => {
  try {
    const hero = await SuperHero.findById(req.params.id);
    if (!hero) return res.status(404).send('Héroe no encontrado');
    res.render('new', { title: 'Editar Héroe', hero });
  } catch (err) {
    res.status(500).render('error', { title: 'Error', error: err.message });
  }
});

router.post('/heroes/:id/edit', async (req, res) => {
  const { id } = req.params;
  const data = {
    ...req.body,
    poder: req.body.poder?.split(',').map(p => p.trim()),
    aliado: req.body.aliado?.split(',').map(a => a.trim()),
    enemigo: req.body.enemigo?.split(',').map(e => e.trim())
  };

  try {
    await SuperHero.findByIdAndUpdate(id, data, { new: true });
    res.redirect('/heroes/list');
  } catch (err) {
    res.status(500).render('error', { title: 'Error', error: err.message });
  }
});

// Eliminar héroe
router.delete('/heroes/:id/delete', async (req, res) => {
  try {
    await SuperHero.findByIdAndDelete(req.params.id);
    res.redirect('/heroes/list');
  } catch (err) {
    res.status(500).render('error', { title: 'Error', error: err.message });
  }
});

export default router;
