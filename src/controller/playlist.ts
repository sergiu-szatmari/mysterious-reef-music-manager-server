import { Request, Response, NextFunction, RequestHandler } from 'express';

import { IController } from '../interface';
import { playlistService } from '../service';
import { Playlist } from '../model';

export class PlaylistController implements IController {

    get: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await playlistService.get();
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await playlistService.findOne(playlist => playlist.id === id);
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    post: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { name } = req.body;
            const result = await playlistService.insert(new Playlist(undefined, name));

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
            const result    = await playlistService.updateOne(
                (pl: Playlist) => pl.id === id,
                (pl: Playlist) => pl.name = name
            );

            if (!result) throw Error('Update (rename playlist) failed');
            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    delete: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await playlistService.removeOne(playlist => playlist.id === id);

            if (!result) throw Error('Remove playlist failed');
            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }
}