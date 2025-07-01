import { Router } from "express";
import { UserController } from "./user.controller";

const userAppRouter = (): Router => {
    const ROUTER = Router();
    const CONTROLLER = new UserController();
    ROUTER.delete('/:id', CONTROLLER.deleteById);
    ROUTER.patch('/', CONTROLLER.update);
    ROUTER.post('/auth', CONTROLLER.authentify);
    ROUTER.put('/', CONTROLLER.create);
    return ROUTER;
};

export default userAppRouter;