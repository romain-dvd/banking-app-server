import type { User } from "./user.type";

export interface UserRepo {
    create: (user: User) => Promise<void>;
    deleteById: (id: string) => Promise<boolean>;
    findById: (id: string) => Promise<User | null>;
    update: (user: User) => Promise<boolean>;
}