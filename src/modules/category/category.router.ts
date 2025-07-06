import express from 'express';
import { CategoryController } from './category.control';
import { CategoryMongoRepo } from './category.mongo.repo';

import type { Router } from "express";

export const createCategoryRouter = (): Readonly<Router> => {
    const CONTROL = new CategoryController(new CategoryMongoRepo());
    const ROUTER = express.Router();
    ROUTER.delete('/:id', CONTROL.deleteById);
    ROUTER.get('/:id', CONTROL.findById);
    ROUTER.post('/', CONTROL.find);
    ROUTER.patch('/', CONTROL.update);
    ROUTER.put('/', CONTROL.create);
    return ROUTER;
};