import express from 'express';
import { TransactionController } from './transaction.control';
import { TransactionMongoRepo } from './transaction.mongo.repo';

import type { Router } from "express";

export const createTransactionRouter = (): Readonly<Router> => {
    const CONTROL = new TransactionController(new TransactionMongoRepo());
    const ROUTER = express.Router();
    ROUTER.delete('/:id', CONTROL.deleteById);
    ROUTER.get('/:id', CONTROL.findById);
    ROUTER.post('/', CONTROL.find);
    ROUTER.patch('/', CONTROL.update);
    ROUTER.put('/', CONTROL.create);
    return ROUTER;
};