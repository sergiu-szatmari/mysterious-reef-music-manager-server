import { Request, Response, NextFunction, RequestHandler } from 'express';

import { IController } from '../interface';
import { playlistService } from '../service';
import {Playlist, Song} from '../model';

export class PlaylistController implements IController {

    // host/api/playlists
    get: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await playlistService.get();
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    // host/api/playlists/:id
    getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await playlistService.findOne(id);

            return result ?
                res.status(200).json(result) :
                res.sendStatus(404);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    // host/api/playlist
    // { "name": "newPlaylistName" }
    // { "name": "newPlaylistName", "songIDs": [ "id1", "id2", ... ] }
    post: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, songIDs } = req.body;
            if (!name) throw new Error('No playlist name provided');

            const result = await playlistService.insert(name, songIDs);

            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    // host/api/songs/:id
    // { "songID": "someID" }
    insertSong: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { songID } = req.body;

            if (!songID) throw new Error('No song ID provided');

            return await playlistService.addSong(id, songID) ?
                res.sendStatus(200) :
                res.sendStatus(404);
        } catch (err) {
            next(`Error occurred: "${err.message}"`);
        }
    }

    // host/api/playlists/:id
    // { "name": "renamePlaylist" }
    patch: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id }    = req.params;
            const { name }  = req.body;

            if (!name) throw new Error('No name provided');

            const result = await playlistService.renamePlaylist(id, name);

            if (!result) throw Error('Update (rename playlist) failed');
            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    put: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        next();
    }
    // host/api/playlists/id
    delete: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await playlistService.removeOne(id);

            return result ?
                res.sendStatus(200) :
                res.status(404).json({ message: `Playlist with ID "${id} does not exist` });
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    removeSong: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        // try {
        //     const { id, songID } = req.params;
        //     if (!id || !songID) throw new Error('Required params missing (playlist id, song id)');
        //
        //     // let errMsg = !Playlist.findOne(p => p.id === id) ?
        //     //     `Playlist with ID "${id}" was not found` : (
        //     //         !Song.findOne(s => s.id === songID) ?
        //     //             `Song with ID "${songID}" was not found` : ''
        //     //     );
        //     // if (!!errMsg) throw new Error(errMsg);
        //
        //     await playlistService.removeSong(id, songID);
        //     return res.sendStatus(200);
        // } catch (err) {
        //     next(`Error occured: "${err.message}"`);
        // }
    }
}
