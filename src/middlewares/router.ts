import { Router } from "express";
import userAppRouter from "../modules/user/user.app.router";

const createRouting = (): Record<string, Router> => {
    return {
        '/user': userAppRouter()
    };
};

const createAppRouter = (): Router => {
    const ROUTER = Router();
    const ROUTING = createRouting();
    const ENTRIES = Object.entries(ROUTING);
    ENTRIES.forEach(([path, route]) => {
        ROUTER.use(path, route);
    });
    return ROUTER;
};

const router = (): Router => {
    const ROUTER = Router();
    const APP_ROUTER = createAppRouter();
    ROUTER.use('/app', APP_ROUTER);
    return ROUTER;
};

export default router;