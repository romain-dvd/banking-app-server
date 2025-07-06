import { HttpError } from "../types/error.type";

import type { NextFunction, Request, Response } from "express";

export const handleError = (
    error: unknown,
    _request: Request,
    response: Response,
    _next: NextFunction
): void => {
    console.error(error);
    response.statusMessage = error instanceof HttpError ? error.message : 'An unknown error occured';
    response.status(error instanceof HttpError ? error.httpStatus : 500).json();
};