import type { Search } from "../../types/search.type";
import type { Account } from "./account.type";

export interface AccountRepo {
    create: (account: Account) => Promise<void>;
    deleteById: (id: string) => Promise<boolean>;
    find: (search: Search<Account>) => Promise<Account<string>[]>;
    findById: (id: string) => Promise<Account<string> | null>;
    update: (account: Account) => Promise<boolean>;
}