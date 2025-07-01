import cors from 'cors';
import express, { Express, RequestHandler, json } from 'express';
import { Server } from 'http';
import router from '../middlewares/router';
import errorCatcher from '../utils/error-catcher';

const createMiddlewares = (): ReadonlyArray<RequestHandler> => {
    const CORS_BYPASS = cors();
    const JSON_PARSER = json();
    const ROUTER = router();
    return [CORS_BYPASS, JSON_PARSER, ROUTER];
};

const createExpressApp = (): Readonly<Express> => {
    const APP = express();
    const MIDDLEWARES = createMiddlewares();
    return APP.use(...MIDDLEWARES);
};

export const startServer = (port: number): Readonly<Server> => {
    try {
        const APP = createExpressApp();
        const SERVER = APP.listen(port);
        console.log('Server started');
        return SERVER;
    } catch (error) {
        return errorCatcher.handleFatalError(`Error starting server: ${error}`);
    }
};