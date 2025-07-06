import express from 'express';
import { AccountController } from './account.control';
import { AccountMongoRepo } from './account.mongo.repo';

import type { Router } from "express";

export const createAccountRouter = (): Readonly<Router> => {
    const CONTROL = new AccountController(new AccountMongoRepo());
    const ROUTER = express.Router();
    ROUTER.delete('/:id', CONTROL.deleteById);
    ROUTER.get('/:id', CONTROL.findById);
    ROUTER.post('/', CONTROL.find);
    ROUTER.patch('/', CONTROL.update);
    ROUTER.put('/', CONTROL.create);
    return ROUTER;
};