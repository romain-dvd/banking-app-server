import { HttpError } from "../../types/error.type";

import type { Search } from "../../types/search.type";
import type { TransactionRepo } from "./transaction.repo";
import type { Transaction } from "./transaction.type";

export class TransactionUseCase {
    constructor(private repo: TransactionRepo) { }

    public create = async (transaction: Transaction<string, string, string>): Promise<void> => {
        return this.repo.create(transaction);
    };

    public deleteById = async (id: string): Promise<void> => {
        const DONE = await this.repo.deleteById(id);
        if (!DONE) {
            throw new HttpError('Deletion has been canceled: transaction not found', 404);
        }
    };

    public find = async (search: Search<Transaction<string, string, string>>): Promise<Transaction<string, string, string>[]> => {
        return this.repo.find(search);
    };

    public findById = async (id: string): Promise<Transaction<string, string, string>> => {
        const ACCOUNT = await this.repo.findById(id);
        if (!ACCOUNT) {
            throw new HttpError('Transaction not found', 404);
        }
        return ACCOUNT;
    };

    public update = async (transaction: Transaction<string, string, string>): Promise<void> => {
        const DONE = await this.repo.update(transaction);
        if (!DONE) {
            throw new HttpError('Update has been canceled: transaction not found', 404);
        }
    };
}