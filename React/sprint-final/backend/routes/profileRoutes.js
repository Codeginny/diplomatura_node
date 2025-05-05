// routes/profileRoutes.js
import express from 'express';
import profileCtrl from '../controllers/profileController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, profileCtrl.createProfile);
router.get('/', auth, profileCtrl.getProfiles);
router.put('/:id', auth, profileCtrl.updateProfile);
router.delete('/:id', auth, profileCtrl.deleteProfile);

export default router;
