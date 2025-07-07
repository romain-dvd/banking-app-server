import express from 'express';
import { UserController } from './user.control';
import { UserMongoRepo } from './user.mongo.repo';

import type { Router } from "express";

export const createUserRouter = (): Readonly<Router> => {
    const CONTROL = new UserController(new UserMongoRepo());
    const ROUTER = express.Router();
    ROUTER.delete('/:id', CONTROL.deleteById);
    ROUTER.get('/:id', CONTROL.findById);
    ROUTER.patch('/', CONTROL.update);
    ROUTER.put('/', CONTROL.create);
    return ROUTER;
};