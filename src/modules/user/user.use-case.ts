import { createEncyption, createKey } from "../../helpers/encryption";
import { HttpError } from "../../types/error.type";

import type { UserRepo } from "./user.repo";
import type { User } from "./user.type";

export class UserUseCase {
    constructor(private repo: UserRepo) { }

    public create = async (user: User): Promise<void> => {
        const KEY = createKey();
        const PASSWORD = createEncyption(user.password, KEY);
        const ENCRYPTED = {
            ...user,
            key: KEY,
            password: PASSWORD
        };
        return this.repo.create(ENCRYPTED);
    };

    public deleteById = async (id: string): Promise<void> => {
        const DONE = await this.repo.deleteById(id);
        if (!DONE) {
            throw new HttpError('Deletion has been canceled: user not found', 404);
        }
    };

    public findById = async (id: string): Promise<User> => {
        const ACCOUNT = await this.repo.findById(id);
        if (!ACCOUNT) {
            throw new HttpError('User not found', 404);
        }
        return ACCOUNT;
    };

    public update = async (user: User): Promise<void> => {
        const USER = await this.repo.findById(user._id);
        if (!USER) {
            throw new HttpError('Update has been canceled: user not found', 404);
        }
        if (user.password === USER.password) {
            const DONE = await this.repo.update(user);
            if (!DONE) {
                throw new HttpError('Update has been canceled: user not found', 404);
            }
            return;
        }
        const KEY = createKey();
        const PASSWORD = createEncyption(user.password, KEY);
        const ENCRYPTED = {
            ...user,
            key: KEY,
            password: PASSWORD
        };
        const DONE = await this.repo.update(ENCRYPTED);
        if (!DONE) {
            throw new HttpError('Update has been canceled: user not found', 404);
        }
        return;
    };
}