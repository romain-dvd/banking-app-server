import cors from 'cors';
import express from 'express';
import { throwFatal } from '../helpers/error';
import { handleError } from '../middlewares/error-handler';
import { createRouter } from '../middlewares/router';

import type { Express, RequestHandler } from 'express';
import type { Server } from 'http';

const createMiddlewares = (): ReadonlyArray<RequestHandler> => {
    const CORS_BYPASS = cors();
    const JSON_PARSER = express.json();
    const ROUTER = createRouter();
    return [
        handleError,
        CORS_BYPASS,
        JSON_PARSER,
        ROUTER
    ] as RequestHandler[];
};

const createExpressApp = (): Express => {
    const APP = express();
    const MIDDLEWARES = createMiddlewares();
    return APP.use(...MIDDLEWARES);
};

export const startServer = (port: number): Server => {
    try {
        const APP = createExpressApp();
        const SERVER = APP.listen(port);
        console.log('Server started');
        return SERVER;
    } catch (error) {
        return throwFatal(`Fatal error: trying to start server: ${error}`);
    }
};