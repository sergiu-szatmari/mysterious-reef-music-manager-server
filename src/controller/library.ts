import { NextFunction, Request, RequestHandler, Response } from 'express';

import { IController } from '../interface';
import { libraryService } from '../service';
import {Library, Playlist} from '../model';

export class LibraryController implements IController {

    // host/api/libraries/
    get: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await libraryService.get();
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    // host/api/libraries/:id
    getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await libraryService.findOne(id);

            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    // host/api/libraries/
    // { "name": "Libr name" }
    // { "name": "Libr name", "playlistIDs": [ "id1", "id2", ... ] }
    post: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { name, playlistIDs } = req.body;

            if (!name) throw new Error('No library name provided. Creating new library failed');

            const result = await libraryService.insert(name, playlistIDs);

            if (!result) throw new Error('Insert failed');
            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    // host/api/libraries/:id
    // { "playlistID": "some ID val" }
    insertPlaylist: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { playlistID } = req.body;

            if (!playlistID) throw new Error('No song ID provided');

            return await libraryService.addPlaylist(id, playlistID) ?
                res.sendStatus(200) :
                res.sendStatus(404);

        } catch (err) {
            next(`Exception occured: "${err.message}"`);
        }
    }

    // host/api/libraries/id
    patch: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        // try {
        //     const { id }    = req.params;
        //     const { name }  = req.body;
        //
        //     if (!name) throw new Error('No name provided for library update');
        //
        //     const result    = await libraryService.updateOne(
        //         (li: Library) => li.id === id,
        //         (li: Library) => li.name = name
        //     );
        //
        //     if (!result) throw Error('Update (rename song) failed');
        //     return res.sendStatus(200);
        // } catch (err) {
        //     next(`Exception occurred: ${err.message}`)
        // }
    }

    // host/api/libraries/id
    delete: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        // try {
        //     const { id } = req.params;
        //     const result = await libraryService.removeOne(song => song.id === id);
        //
        //     return result ?
        //         res.sendStatus(200) :
        //         res.status(200).json({ message: `Library with ID "${id}" does not exist` });
        // } catch (err) {
        //     next(`Exception occurred: ${err.message}`)
        // }
    }

    removePlaylist: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        // try {
        //     const { id, playlistID } = req.params;
        //
        //     // let errMsg = !Library.findOne(lib => lib.id === id) ?
        //     //     `Library with ID "${id}" was not found` : (
        //     //         !Playlist.findOne(pl => pl.id === playlistID) ?
        //     //             `Playlist with ID "${playlistID}" was not found` : ''
        //     //     );
        //     // if (!!errMsg) throw new Error(errMsg);
        //
        //     await libraryService.removePlaylist(id, playlistID);
        //     return res.sendStatus(200);
        // } catch (err) {
        //     next(`Error occurred: "${err.message}"`);
        // }
    }
}