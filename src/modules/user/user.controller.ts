import { Request, Response } from "express";
import { HttpError } from "../../types/error.type";
import { UserMongoRepo } from "./user.mongo.repo";
import { UserUseCases } from "./user.use-case";

export class UserController {
    private readonly userUseCase = new UserUseCases(new UserMongoRepo());

    public async create(request: Request, response: Response): Promise<void> {
        await this.userUseCase.create(request.body);
        response.json();
    }

    public async deleteById(request: Request, response: Response): Promise<void> {
        const ID = request.params['id'];
        if (!ID) {
            throw new HttpError('Id is missing', 400);
        }
        await this.userUseCase.deleteById(ID);
        response.json();
    }

    public async authentify(request: Request, response: Response): Promise<void> {
        const USER = await this.userUseCase.authentify(request.body);
        response.json(USER);
    }

    public async update(request: Request, response: Response): Promise<void> {
        await this.userUseCase.update(request.body);
        response.json();
    }
}