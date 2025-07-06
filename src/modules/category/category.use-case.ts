import { HttpError } from "../../types/error.type";

import type { Search } from "../../types/search.type";
import type { CategoryRepo } from "./category.repo";
import type { Category } from "./category.type";

export class CategoryUseCase {
    constructor(private repo: CategoryRepo) { }

    public create = async (category: Category): Promise<void> => {
        return this.repo.create(category);
    };

    public deleteById = async (id: string): Promise<void> => {
        const DONE = await this.repo.deleteById(id);
        if (!DONE) {
            throw new HttpError('Deletion has been canceled: category not found', 404);
        }
    };

    public find = async (search: Search<Category>): Promise<Category[]> => {
        return this.repo.find(search);
    };

    public findById = async (id: string): Promise<Category> => {
        const ACCOUNT = await this.repo.findById(id);
        if (!ACCOUNT) {
            throw new HttpError('Category not found', 404);
        }
        return ACCOUNT;
    };

    public update = async (category: Category): Promise<void> => {
        const DONE = await this.repo.update(category);
        if (!DONE) {
            throw new HttpError('Update has been canceled: category not found', 404);
        }
    };
}