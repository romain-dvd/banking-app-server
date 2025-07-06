import { getAccountModel } from "./account.model";

import type { Search } from "../../types/search.type";
import type { AccountRepo } from "./account.repo";
import type { Account } from "./account.type";

export class AccountMongoRepo implements AccountRepo {
    private readonly model = getAccountModel();

    public async create(account: Account): Promise<void> {
        await this.model.create(account);
    }

    public async deleteById(id: string): Promise<boolean> {
        const RESULT = await this.model.deleteOne({ _id: id });
        return RESULT.deletedCount > 0;
    }

    public async find(search: Search<Account>): Promise<Account[]> {
        const FILTER = search.filter || {};
        const OFFSET = search.offset || 0;
        const QUERY = this.model.find(FILTER).sort(search.sort).skip(OFFSET);
        const DOCUMENTS = await (search.quantity ? QUERY.skip(search.quantity) : QUERY);
        return DOCUMENTS.map((document) => document.toJSON());
    }

    public async findById(id: string): Promise<Account | null> {
        const DOCUMENT = await this.model.findById(id);
        return DOCUMENT?.toJSON() || null;
    }

    public async update(account: Account): Promise<boolean> {
        const RESULT = await this.model.updateOne({ _id: account._id }, account);
        return RESULT.modifiedCount > 0;
    }
}