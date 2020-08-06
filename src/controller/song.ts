import { Request, Response, NextFunction, RequestHandler } from 'express';

import { Artist, Song } from '../model';
import { IController } from '../interface';
import {artistService, songService} from '../service';
import {Document} from "mongoose";

export class SongController implements IController {

    // host/api/songs/
    get: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await songService.get();
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    // host/api/songs/:id
    getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await songService.findOne(id);
            console.log("Controller -> Result: ");
            console.log(result);
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    // host/api/songs
    // { name: "...", duration: 123, genre: "...", bpm: 123, artistID: ID }
    post: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, artistID, duration, genre, bpm } = req.body;

            if (!name || !artistID || !duration || !genre || !bpm) throw new Error('Not all required fields were provided');
            if (!Array.isArray(genre)) throw new Error('Invalid genre array');

            const result = await songService.insert(name, artistID, duration, genre, bpm);

            if (!result) throw new Error('Insert failed');
            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    patch: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        next();
    }

    put: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { name, artistID, duration, genre, bpm } = req.body;

            if (!name || !artistID || !duration || !genre || !bpm) throw new Error('Not all required fields were provided');
            if (!Array.isArray(genre)) throw new Error('Invalid genre array');

            const result = await songService.updateOne(id, name, artistID, duration, genre, bpm);
            return !!result ?
                res.sendStatus(200) :
                res.sendStatus(404);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    delete: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            //const result =
            await songService.removeOne(id);

            // if (!result) throw Error('Removing song failed');
            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

}
