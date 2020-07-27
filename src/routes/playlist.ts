import express, {Request, Response, Router} from 'express';

import { RequestValidator } from '../middlewares';
import { playlistService } from '../services';

export const router: Router = express.Router();

router.get('/', async (req, res) => {

    console.log('get reached');
    return res.status(200).json({ message: "Not yet implemented" });
});

router.get('/:playlistId', async (req: Request, res: Response) => {

    const playlistId = req.params.playlistId;
    try {
        if (!playlistId) throw new Error('No playlist ID provided');

        const result = await playlistService.findOne({ id: playlistId });

        return !!result ?
            res.status(200).json(result) :
            res.status(404).json({ message: 'Not found' });

    } catch (err) {
        return res.status(500).json({message: err.message});
    }
});

router.post('/', RequestValidator.validatePlaylist, async (req: Request, res: Response) => {

    console.log(`Received name "${req.body.name}" for creating new playlist`);

    return res.status(200).json({ message: "Not yet implemented" });
});

router.patch('/:playlistId', RequestValidator.validatePlaylist, async (req, res) => {

    const { name } = req.body;
    const { playlistId } = req.params;

    console.log(`Playlist #${playlistId}'s name will be changed to "${name}"`);

    return res.status(200).json({ message: "Not yet implemented" });
});

router.delete('/:playlistId', async (req, res) => {

    const { playlistId } = req.params;
    console.log(`Removing playlist #${playlistId}`);

    return res.status(200).json({ message: "Not yet implemented" });
});

