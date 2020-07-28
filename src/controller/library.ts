import { NextFunction, Request, RequestHandler, Response } from 'express';

import { IController } from '../interface';
import { libraryService } from '../service';
import {Library} from "../model";

export class LibraryController implements IController {


    get: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await libraryService.get();
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    getOne: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await libraryService.findOne(song => song.id === id);
            return res.status(200).json(result);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

    post: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let { name } = req.body;

            const result = await libraryService.insert(
                new Library(undefined, name)
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
            const result    = await libraryService.updateOne(
                (li: Library) => li.id === id,
                (li: Library) => li.name = name
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
            const result = await libraryService.removeOne(song => song.id === id);

            if (!result) throw Error('Removing song failed');
            return res.sendStatus(200);
        } catch (err) {
            next(`Exception occurred: ${err.message}`)
        }
    }

}