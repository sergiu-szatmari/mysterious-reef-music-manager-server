import { Request, Response, NextFunction, RequestHandler } from 'express';

import { Artist, Song } from '../model';
import { IController } from '../interface';
import { songService } from '../service';

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

    // host/api/songs/someidvalue
    getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await songService.findOne(song => song.id === id);
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    // host/api/songs
    // { name: "...", duration: 123, genre: "...", bpm: 123,
    //   aristId: someidvalue / artist: Artist }
    post: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, artistID, duration, genre, bpm } = req.body;

            if (!name || !artistID || !duration || !genre || !bpm) throw new Error('Not all required fields were provided');

            const artist = Artist.findOne(artist => artist.id === artistID);

            if (!artist) throw new Error('No artist with provided ID was found');

            // artist = new Artist(artist.id ?? undefined, artist.name, artist.birthDate, artist.originCountry);

            const result = await songService.insert(
                new Song(undefined, name, artistID, duration, genre, bpm)
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
            const { name, duration, genre, bpm }  = req.body;
            const result    = await songService.updateOne(
                (s: Song) => s.id === id,
                (s: Song) => {
                    if (name) s.name = name;
                    if (duration) s.duration = duration;
                    if (genre) s.genre = genre;
                    if (bpm) s.bpm = bpm;
                }
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