import type { Search } from "../../types/search.type";
import type { Category } from "./category.type";

export interface CategoryRepo {
    create: (category: Category) => Promise<void>;
    deleteById: (id: string) => Promise<boolean>;
    find: (search: Search<Category>) => Promise<Category<string>[]>;
    findById: (id: string) => Promise<Category<string> | null>;
    update: (category: Category) => Promise<boolean>;
}