import express from 'express';
import { getSuperheroes, addSuperhero } from '../controllers/superheroesController.mjs';

const router = express.Router();

router.get('/', getSuperheroes);
router.post('/', addSuperhero);

export default router;
