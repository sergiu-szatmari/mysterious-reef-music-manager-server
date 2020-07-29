import { Request, Response, NextFunction, RequestHandler } from 'express';

import { IController } from '../interface';
import { artistService } from '../service';
import { Artist } from "../model";

export class ArtistController implements IController {

    // host/api/artists
    get: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await artistService.get();
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    // host/api/artists/id
    getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await artistService.findOne(artist => artist.id === id);
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    // host/api/artists
    // { name: "Some name", birthDate: "YYYY-MM-DD", originCountry: "Some country" }
    post: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { name, birthDate, originCountry } = req.body;

            if (!name || !birthDate) throw new Error('Required fields were not provided');

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

    // host/api/artists/id
    // { name: "Other name", birthDate: "YYYY-MM-DD", originCountry: "..." }
    patch: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { name, birthDate, originCountry } = req.body;

            if (!name || !birthDate) throw new Error('No required fields provided');

            const result = await artistService.updateOne(
                (a: Artist) => a.id === id,
                (a: Artist) => {
                    a.name = name;
                    a.birthDate = new Date(birthDate);
                    if (originCountry) a.originCountry = originCountry;
                }
            );

            if (!result) throw Error('Update (rename artist) failed');
            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    // host/api/artists
    delete: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await artistService.removeOne(artist => artist.id === id);

            return result ?
                res.sendStatus(200) :
                res.status(200).json({ message: `Artist with ID "${id}" does not exist` });
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }
}