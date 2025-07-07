import { HttpError } from "../../types/error.type";
import { UserUseCase } from "./user.use-case";

import type { Request, Response } from 'express';
import type { UserRepo } from "./user.repo";

export class UserController {
    private readonly useCase: UserUseCase;

    constructor(repo: UserRepo) {
        this.useCase = new UserUseCase(repo);
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