import express from 'express';
import { createAccountRouter } from '../modules/account/account.router';
import { createCategoryRouter } from '../modules/category/category.router';
import { createTransactionRouter } from '../modules/transaction/transaction.router';

import type { Router } from "express";

export const createRouter = (): Readonly<Router> => {
    const ROUTER = express.Router();
    ROUTER.use('/accounts', createAccountRouter() as Router);
    ROUTER.use('/categories', createCategoryRouter() as Router);
    ROUTER.use('/transactions', createTransactionRouter() as Router);
    return ROUTER;
};