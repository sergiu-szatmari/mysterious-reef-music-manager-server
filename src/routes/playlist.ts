import express, {Request, Response, Router} from 'express';

import { RequestValidator } from '../middlewares';
import { playlistService } from '../services';
import {Song} from "../model";

export const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {

    try {
        const result = await playlistService.get();
        playlistService.log();

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ message: `Exception occured: ${err.message}`});
    }
});

router.get('/:playlistName', async (req: Request, res: Response) => {

    const playlistName = req.params.playlistName;
    try {
        if (!playlistName) throw new Error('No playlist ID provided');

        // const result = await playlistService.findOne({ id: playlistId });
        const result = await playlistService.findOne(playlistName);

        return !!result ?
            res.status(200).json(result) :
            res.status(404).json({ message: 'Not found' });

    } catch (err) {
        return res.status(500).json({message: err.message});
    }
});

router.post('/', RequestValidator.validatePlaylist, async (req: Request, res: Response) => {

    console.log(`Received name "${req.body.name}" for creating new playlist`);

    try {

        const { name } = req.body;
        const result = await playlistService.addPlaylist(name);

        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    return res.status(200).json({ message: "Not yet implemented" });
});

router.patch('/:playlistId', RequestValidator.validatePlaylist, async (req, res) => {

    const { name } = req.body;
    const { playlistId } = req.params;

    try {

        const result = await playlistService.renamePlaylist(playlistId, name);
        return res.sendStatus(200);
    } catch (err) {

        return res.status(500).json({ message: err.message });
    }

    return res.status(200).json({ message: "Not yet implemented" });
});

router.delete('/:playlistId', async (req, res) => {

    const { playlistId } = req.params;
    console.log(`Removing playlist #${playlistId}`);

    return res.status(200).json({ message: "Not yet implemented" });
});

