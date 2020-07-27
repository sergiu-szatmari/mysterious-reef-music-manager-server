import 'dotenv/config';

import express, { Express, Router } from 'express';
import path from 'path';
import logger from 'morgan';

import { playlistRouter } from './src/routes';
import { ApiPaths } from "./src/util";

const app: Express = express();
const prefix: string = process.env.PREFIX || "/backupApi";

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => { return res.status(200).json({ message: 'Welcome to MyMusicApp'}) });

const apiRouter: Router = express.Router();

apiRouter.use(ApiPaths.PLAYLIST, playlistRouter);
app.use(prefix, apiRouter);

app.use((err: any, req: any, res: any, next: any) => {
    return res.status(500).json({ message: `Unexpected error: "${err.message ?? ''}"` });
});

export { app };