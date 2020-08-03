import { app } from '../app';
import debug from 'debug';
debug('myapp:server');

import http, { Server } from 'http';
import mongoose from 'mongoose';
import config from 'config';

const dbConnectionURL: string = config.get('General.dbConfig.connectionURL');
const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const port = normalizePort(config.get('General.serverConfig.port')) || 5000;
app.set('port', port);

const server: Server = http.createServer(app);

mongoose.connect(dbConnectionURL, dbOptions)
    .then(() => {
        console.log('Connected to Mongo DB');

        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);
    });

/** port ==> number | string | false  */
function normalizePort(val: string): string | number | false {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

function onError(error: any) {
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
