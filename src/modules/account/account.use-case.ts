import { HttpError } from "../../types/error.type";

import type { Search } from "../../types/search.type";
import type { AccountRepo } from "./account.repo";
import type { Account } from "./account.type";

export class AccountUseCase {
    constructor(private repo: AccountRepo) { }

    public create = async (account: Account): Promise<void> => {
        return this.repo.create(account);
    };

    public deleteById = async (id: string): Promise<void> => {
        const DONE = await this.repo.deleteById(id);
        if (!DONE) {
            throw new HttpError('Deletion has been canceled: account not found', 404);
        }
    };

    public find = async (search: Search<Account>): Promise<Account<string>[]> => {
        return this.repo.find(search);
    };

    public findById = async (id: string): Promise<Account<string>> => {
        const ACCOUNT = await this.repo.findById(id);
        if (!ACCOUNT) {
            throw new HttpError('Account not found', 404);
        }
        return ACCOUNT;
    };

    public update = async (account: Account): Promise<void> => {
        const DONE = await this.repo.update(account);
        if (!DONE) {
            throw new HttpError('Update has been canceled: account not found', 404);
        }
    };
}