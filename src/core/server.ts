import cors from 'cors';
import express, { Express, RequestHandler, json } from "express";
import { Server } from 'http';
import { handleFatalError } from '../utils/error-catcher';

/**
 * Create an array of middlewares which will be used by Express.
 * @returns Array of RequestHandler.
 */
const createMiddlewares = (): ReadonlyArray<RequestHandler> => {
    const CORS_BYPASS = cors();
    const JSON_PARSER = json();
    return [CORS_BYPASS, JSON_PARSER];
};

/**
 * Create a configured Express app.
 * @returns Instance of Express.
 */
const createExpressApp = (): Readonly<Express> => {
    const APP = express();
    const MIDDLEWARES = createMiddlewares();
    return APP.use(...MIDDLEWARES);
};

/**
 * Create a server based on an Express app. Throw a fatal error if one occured.
 * @param port Listening port.
 * @returns Instance of Server.
 */
export const startServer = (port: number): Readonly<Server> => {
    try {
        const APP = createExpressApp();
        const SERVER = APP.listen(port);
        console.log('Server started');
        return SERVER;
    } catch (error) {
        return handleFatalError(`Error starting server: ${error}`);
    }
};