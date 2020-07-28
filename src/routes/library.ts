import express, { Router } from 'express';

import { Controller } from '../controller';
import { Logger } from '../middleware';

export const router: Router = express.Router();

router.use(Logger.logRoutes);

router.get('/', Controller.LibraryController.get);
router.get('/:id', Controller.LibraryController.getOne);
router.post('/', Controller.LibraryController.post);
router.patch('/:id', Controller.LibraryController.patch);
router.delete('/:id', Controller.LibraryController.delete);