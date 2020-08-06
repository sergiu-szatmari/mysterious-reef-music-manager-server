import express, { Express, NextFunction, Request, Response, Router } from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import config from 'config';
import debug from 'debug';
debug('myapp:server');

import http, { Server } from 'http';
import cors from 'cors';
import mongoose from 'mongoose';

import { Controller } from './src/controller';
import { ApiPaths } from './src/util';
import { playlistRouter, songRouter,
    artistRouter, libraryRouter } from './src/routes';

const app: Express = express();
const prefix: string = config.get('General.serverConfig.apiPrefix');
const secret: string = config.get('General.secret');
const dbConnectionURL: string = config.get('General.dbConfig.connectionURL');
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const port = normalizePort(config.get('General.serverConfig.port'));

console.log('Secret:', secret);

app.use(logger('dev'));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', Controller.baseURL);

const apiRouter: Router = express.Router();

apiRouter.use(ApiPaths.PLAYLIST, playlistRouter);
apiRouter.use(ApiPaths.SONG, songRouter);
apiRouter.use(ApiPaths.ARTIST, artistRouter);
apiRouter.use(ApiPaths.LIBRARY, libraryRouter);

app.use(prefix, apiRouter);
app.use(Controller.errorHandler);

app.set('port', port);

const server: Server = http.createServer(app);

mongoose
    .connect(dbConnectionURL, dbOptions)
    .then(() => {
        console.log('Connected to Mongo DB');

        server.on('error', onError);
        server.on('listening', onListening);
        server.listen(port);
    });

/** port ==> number | string | false  */
function normalizePort(val: string): string | number | false {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

function onError(error: any): void {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string' ?
        `Pipe ${port}` :
        `Port ${port}` ;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;

        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ?
        `pipe ${addr}` :
        `port ${addr!.port}`;
    debug('Listening on ' + bind);

    console.log(`Server listening on port ${port}`);
}

