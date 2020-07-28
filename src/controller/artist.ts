import { Request, Response, NextFunction, RequestHandler } from 'express';

import { IController } from '../interface';
import { artistService } from '../service';
import { Artist } from "../model";

export class ArtistController implements IController {

    get: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await artistService.get();
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await artistService.findOne(artist => artist.id === id);
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    post: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { name, birthDate, originCountry } = req.body;
            birthDate = new Date(birthDate);

            const result = await artistService.insert(
                new Artist(undefined, name, birthDate, originCountry)
            );

            if (!result) throw new Error('Insert failed');
            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    patch: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id }    = req.params;
            const { name }  = req.body;
            const result    = await artistService.updateOne(
                (a: Artist) => a.id === id,
                (a: Artist) => a.name = name
            );

            if (!result) throw Error('Update (rename artist) failed');
            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    delete: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await artistService.removeOne(artist => artist.id === id);

            if (!result) throw Error('Removing artist failed');
            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

}