import express, { Router } from 'express';

import { Controller } from '../controller';
import { Logger } from '../middleware';
import {Artist, Song} from "../model";
import mongoose from 'mongoose';

export const router: Router = express.Router();

router.use(Logger.logRoutes);

router.get('/', Controller.SongController.get);
router.get('/:id', Controller.SongController.getOne);

router.post('/', Controller.SongController.post);

// router.patch('/:id', Controller.SongController.patch);
//
router.delete('/:id', Controller.SongController.delete);
