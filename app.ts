import 'dotenv/config';

import express, { Express, NextFunction, Request, Response, Router } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

import { ApiPaths, insertMockData } from './src/util';
import { playlistRouter, songRouter,
    artistRouter, libraryRouter } from './src/routes';

// ============= MOCK DATA =============
insertMockData();
// =====================================

const app: Express = express();
const prefix: string = process.env.PREFIX || '/backupApi';

app.use(logger('dev'));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => { return res.status(200).json({ message: 'Welcome to MyMusicApp'}) });

const apiRouter: Router = express.Router();

apiRouter.use(ApiPaths.PLAYLIST, playlistRouter);
apiRouter.use(ApiPaths.SONG, songRouter);
apiRouter.use(ApiPaths.ARTIST, artistRouter);
apiRouter.use(ApiPaths.LIBRARY, libraryRouter);

app.use(prefix, apiRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.trace("Final error handler");
    return res.status(500).json({ message: `Unexpected error: "${err.message ?? ''}"` });
});

export { app };