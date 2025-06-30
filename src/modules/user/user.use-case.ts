import { UserRepo } from "./user.repo";
import { User } from "./user.type";

export class UserUseCases {
    constructor(private readonly userRepo: UserRepo) { }

    public async create(user: User): Promise<void> {
        await this.userRepo.create(user);
    }

    public async deleteById(id: string): Promise<void> {
        await this.userRepo.deleteById(id);
    }

    public async findById(id: string): Promise<User> {
        return this.userRepo.findById(id);
    }

    public async update(user: User): Promise<void> {
        await this.userRepo.update(user);
    }
}