import express, { Router } from 'express';

import { Controller } from '../controller';
import { Logger } from '../middleware';

export const router: Router = express.Router();

router.use(Logger.logRoutes);

router.get('/', Controller.SongController.get);
router.get('/:id', Controller.SongController.getOne);

router.post('/', Controller.SongController.post);

router.put('/:id', Controller.SongController.put);

router.delete('/:id', Controller.SongController.delete);
