import type { Search } from "../../types/search.type";
import type { Transaction } from "./transaction.type";

export interface TransactionRepo {
    create: (category: Transaction<string, string, string, string>) => Promise<void>;
    deleteById: (id: string) => Promise<boolean>;
    find: (search: Search<Transaction<string, string, string, string>>) => Promise<Transaction<string, string, string, string>[]>;
    findById: (id: string) => Promise<Transaction<string, string, string, string> | null>;
    update: (category: Transaction<string, string, string, string>) => Promise<boolean>;
}