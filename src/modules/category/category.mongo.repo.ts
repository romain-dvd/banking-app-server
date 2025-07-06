import { getCategoryModel } from "./category.model";

import type { Search } from "../../types/search.type";
import type { CategoryRepo } from "./category.repo";
import type { Category } from "./category.type";

export class CategoryMongoRepo implements CategoryRepo {
    private readonly model = getCategoryModel();

    public create = async (category: Category): Promise<void> => {
        await this.model.create(category);
    };

    public deleteById = async (id: string): Promise<boolean> => {
        const RESULT = await this.model.deleteOne({ _id: id });
        return RESULT.deletedCount > 0;
    };

    public find = async (search: Search<Category>): Promise<Category[]> => {
        const FILTER = search.filter || {};
        const OFFSET = search.offset || 0;
        const QUERY = this.model.find(FILTER).sort(search.sort).skip(OFFSET);
        const DOCUMENTS = await (search.quantity ? QUERY.skip(search.quantity) : QUERY);
        return DOCUMENTS.map((document) => document.toJSON());
    };

    public findById = async (id: string): Promise<Category | null> => {
        const DOCUMENT = await this.model.findById(id);
        return DOCUMENT?.toJSON() || null;
    };

    public update = async (category: Category): Promise<boolean> => {
        const RESULT = await this.model.updateOne({ _id: category._id }, category);
        return RESULT.modifiedCount > 0;
    };
}