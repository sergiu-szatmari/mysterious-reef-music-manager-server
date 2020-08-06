import {ErrorRequestHandler, NextFunction, Request, RequestHandler, Response} from 'express';
import { SongController } from './song';
import { ArtistController } from './artist';
import { PlaylistController } from './playlist';
import { LibraryController } from './library';

class MainController {

    public readonly SongController: SongController = new SongController();
    public readonly ArtistController: ArtistController = new ArtistController();
    public readonly PlaylistController: PlaylistController = new PlaylistController();
    public readonly LibraryController: LibraryController = new LibraryController();

    baseURL: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        return res.status(200).json({ message: 'Welcome to MyMusicApp'})
    }

    errorHandler: ErrorRequestHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(err.message);
        console.trace("Final error handler");
        return res.status(500).json({ message: `Unexpected error: '${err.message}'` });
    }
}

export const Controller = new MainController();
