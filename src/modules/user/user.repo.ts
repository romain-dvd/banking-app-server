import { User } from "./user.type";

export interface UserRepo {
    create: (user: User) => Promise<User>;
    deleteById: (id: string) => Promise<void>;
    findById: (id: string) => Promise<User>;
    update: (user: User) => Promise<void>;
}