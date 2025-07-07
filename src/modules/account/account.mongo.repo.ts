import { getAccountModel } from "./account.model";

import type { Search } from "../../types/search.type";
import type { AccountRepo } from "./account.repo";
import type { Account } from "./account.type";

export class AccountMongoRepo implements AccountRepo {
    private readonly model = getAccountModel();

    public create = async (account: Account): Promise<void> => {
        await this.model.create(account);
    };

    public deleteById = async (id: string): Promise<boolean> => {
        const RESULT = await this.model.deleteOne({ _id: id });
        return RESULT.deletedCount > 0;
    };

    public find = async (search: Search<Account>): Promise<Account<string>[]> => {
        const FILTER = search.filter || {};
        const OFFSET = search.offset || 0;
        const QUERY = this.model.find(FILTER).sort(search.sort).skip(OFFSET);
        const DOCUMENTS = await (search.quantity ? QUERY.skip(search.quantity) : QUERY);
        return DOCUMENTS.map((document) => document.toJSON());
    };

    public findById = async (id: string): Promise<Account<string> | null> => {
        const DOCUMENT = await this.model.findById(id);
        return DOCUMENT?.toJSON() || null;
    };

    public update = async (account: Account): Promise<boolean> => {
        const RESULT = await this.model.updateOne({ _id: account._id }, account);
        return RESULT.modifiedCount > 0;
    };
}