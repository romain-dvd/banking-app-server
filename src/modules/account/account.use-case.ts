import { HttpError } from "../../types/error.type";

import type { Search } from "../../types/search.type";
import type { AccountRepo } from "./account.repo";
import type { Account } from "./account.type";

export class AccountUseCase {
    constructor(private repo: AccountRepo) { }

    public async create(account: Account): Promise<void> {
        return this.repo.create(account);
    }

    public async deleteById(id: string): Promise<void> {
        const DONE = await this.repo.deleteById(id);
        if (!DONE) {
            throw new HttpError('Deletion has been canceled: account not found', 404);
        }
    }

    public async find(search: Search<Account>): Promise<Account[]> {
        return this.repo.find(search);
    }

    public async findById(id: string): Promise<Account> {
        const ACCOUNT = await this.repo.findById(id);
        if (!ACCOUNT) {
            throw new HttpError('Account not found', 404);
        }
        return ACCOUNT;
    }

    public async update(account: Account): Promise<void> {
        const DONE = await this.repo.update(account);
        if (!DONE) {
            throw new HttpError('Update has been canceled: account not found', 404);
        }
    }
}