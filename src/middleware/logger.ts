import { NextFunction, Request, RequestHandler, Response } from 'express';

export class MusicAppLogger {

    private static now(): string {

        return new Date().toISOString().
            replace(/T/, ' ').
            replace(/\..+/, '');
    }

    static log(message: string, type: MusicAppLogType = MusicAppLogType.INFO) {

        switch (type) {
            case MusicAppLogType.INFO:
            case MusicAppLogType.DEBUG:
            case MusicAppLogType.WARNING:
            case MusicAppLogType.ERROR:

                const now = this.now();
                const caller = this.log.caller ?? 'Top level call';

                console.log(`[ ${now} ] [ ${type} ] [ ${caller} ] ${message}`);
        }
    }

    static logRoutes: RequestHandler = (req: Request, res: Response, next: NextFunction) => {

        const { method, originalUrl, cookies, ip, query, params, body } = req;

        console.log()
        console.log(`>>>`);
        console.log(`[ ${method} ] [ ${ip} ] To: ${originalUrl}`);
        console.log(`[ ${method} ] [ ${ip} ] Cookies: ${JSON.stringify(cookies, null, 1).replace(/\r?\n|\r/g, '')}`);
        console.log(`[ ${method} ] [ ${ip} ] Params: ${JSON.stringify(params, null, 1).replace(/\r?\n|\r/g, '')}`);
        console.log(`[ ${method} ] [ ${ip} ] Query: ${JSON.stringify(query, null, 1).replace(/\r?\n|\r/g, '')}`);
        console.log(`[ ${method} ] [ ${ip} ] Body: ${JSON.stringify(body, null, 1).replace(/\r?\n|\r/g, '')}`);

        next();
    }
}

export enum MusicAppLogType {

    INFO    = "INFO",
    DEBUG   = "DEBUG",
    WARNING = "WARNING",
    ERROR   = "ERROR"
}