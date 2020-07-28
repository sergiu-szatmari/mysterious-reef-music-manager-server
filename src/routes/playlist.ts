import express, { Router } from 'express';

import { Controller } from '../controller';
import { Logger } from '../middleware';

export const router: Router = express.Router();

router.use(Logger.logRoutes);

router.get('/', Controller.PlaylistController.get);
router.get('/:id', Controller.PlaylistController.getOne);
router.post('/', Controller.PlaylistController.post);
router.patch('/:id', Controller.PlaylistController.patch);
router.delete('/:id', Controller.PlaylistController.delete);