import { HttpError } from "../../types/error.type";
import { TransactionUseCase } from "./transaction.use-case";

import type { Request, Response } from 'express';
import type { TransactionRepo } from "./transaction.repo";

export class TransactionController {
    private readonly useCase: TransactionUseCase;

    constructor(repo: TransactionRepo) {
        this.useCase = new TransactionUseCase(repo);
    }

    public create = async (request: Request, response: Response): Promise<void> => {
        await this.useCase.create(request.body);
        response.json();
    };

    public deleteById = async (request: Request, response: Response): Promise<void> => {
        const ID = request.params['id'];
        if (!ID) {
            throw new HttpError(`Invalid request: id is missing`, 400);
        }
        await this.useCase.deleteById(ID);
        response.json();
    };

    public find = async (request: Request, response: Response): Promise<void> => {
        const ACCOUNTS = await this.useCase.find(request.body);
        response.json(ACCOUNTS);
    };

    public findById = async (request: Request, response: Response): Promise<void> => {
        const ID = request.params['id'];
        if (!ID) {
            throw new HttpError(`Invalid request: id is missing`, 400);
        }
        const ACCOUNT = await this.useCase.findById(ID);
        response.json(ACCOUNT);
    };

    public update = async (request: Request, response: Response): Promise<void> => {
        await this.useCase.update(request.body);
        response.json();
    };
}