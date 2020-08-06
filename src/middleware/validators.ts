import { NextFunction, Request, RequestHandler, Response } from 'express';

export class RequestValidator {

    static validatePlaylist: RequestHandler = ((req: Request, res: Response, next: NextFunction) => {

        const { name } = req.body;
        console.log(`Name of playlist: "${name}"`);

        if (!name) return res.status(422).json({ message: "No name provided" });

        next();
    })
}

export class MongoDBValidator {

    static validateString: (input: string) => boolean = (input) => { return /^[a-zA-Z0-9\-]$/i.test(input); };


}
