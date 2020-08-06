import { RequestHandler } from "express";

export interface IController {
    get: RequestHandler;
    getOne: RequestHandler;
    post: RequestHandler;
    put: RequestHandler;
    delete: RequestHandler;
}
