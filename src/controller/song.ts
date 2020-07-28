import { Request, Response, NextFunction, RequestHandler } from 'express';

import { Artist, Song } from '../model';
import { IController } from '../interface';
import { songService } from '../service';

export class SongController implements IController {

    get: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await songService.get();
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await songService.findOne(song => song.id === id);
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    post: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { name, artistId, duration, genre, bpm } = req.body;
            let { artist } = req.body;

            console.log(artist);

            artist = artistId ?
                Artist.findOne(artist => artist.id === artistId) :
                artist;

            artist = new Artist(artist.id ?? undefined, artist.name, artist.birthDate, artist.originCountry);

            const result = await songService.insert(
                new Song(undefined, name, artist, duration, genre, bpm)
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
            const result    = await songService.updateOne(
                (s: Song) => s.id === id,
                (s: Song) => s.name = name
            );

            if (!result) throw Error('Update (rename song) failed');
            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    delete: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await songService.removeOne(song => song.id === id);

            if (!result) throw Error('Removing song failed');
            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

}