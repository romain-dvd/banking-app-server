import { getTransactionModel } from "./transaction.model";

import type { Search } from "../../types/search.type";
import type { TransactionRepo } from "./transaction.repo";
import type { Transaction } from "./transaction.type";

export class TransactionMongoRepo implements TransactionRepo {
    private readonly model = getTransactionModel();

    public create = async (transaction: Transaction<string, string, string, string>): Promise<void> => {
        await this.model.create(transaction);
    };

    public deleteById = async (id: string): Promise<boolean> => {
        const RESULT = await this.model.deleteOne({ _id: id });
        return RESULT.deletedCount > 0;
    };

    public find = async (search: Search<Transaction<string, string, string, string>>): Promise<Transaction<string, string, string, string>[]> => {
        const FILTER = search.filter || {};
        const OFFSET = search.offset || 0;
        const QUERY = this.model.find(FILTER).sort(search.sort).skip(OFFSET);
        const DOCUMENTS = await (search.quantity ? QUERY.skip(search.quantity) : QUERY);
        return DOCUMENTS.map((document) => document.toJSON());
    };

    public findById = async (id: string): Promise<Transaction<string, string, string, string> | null> => {
        const DOCUMENT = await this.model.findById(id);
        return DOCUMENT?.toJSON() || null;
    };

    public update = async (transaction: Transaction<string, string, string, string>): Promise<boolean> => {
        const RESULT = await this.model.updateOne({ _id: transaction._id }, transaction);
        return RESULT.modifiedCount > 0;
    };
}