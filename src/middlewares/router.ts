import express from 'express';
import { createAccountRouter } from '../modules/account/account.router';

import type { Router } from "express";

export const createRouter = (): Readonly<Router> => {
    const ROUTER = express.Router();
    ROUTER.use('/accounts', createAccountRouter() as Router);
    return ROUTER;
};