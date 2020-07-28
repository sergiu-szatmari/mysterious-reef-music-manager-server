import { RequestHandler } from "express";

export interface IController {
    get: RequestHandler;
    getOne: RequestHandler;
    post: RequestHandler;
    patch: RequestHandler;
    delete: RequestHandler;
}