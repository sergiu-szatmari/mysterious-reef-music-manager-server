import express, { Router } from 'express';

import { Controller } from '../controller';
import { Logger } from '../middleware';

export const router: Router = express.Router();

router.use(Logger.logRoutes);

router.get('/', Controller.ArtistController.get);
router.get('/:id', Controller.ArtistController.getOne);

router.post('/', Controller.ArtistController.post);

// router.patch('/:id', Controller.ArtistController.patch);
router.put('/:id', Controller.ArtistController.put);

router.delete('/:id', Controller.ArtistController.delete);