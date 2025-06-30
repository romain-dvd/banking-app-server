import { HttpError } from "../../types/error.type";
import userModel from "./user.model";
import { UserRepo } from "./user.repo";
import { User } from "./user.type";

export class UserMongoRepo implements UserRepo {
    private readonly model = userModel();

    public create(user: User): Promise<User> {
        return this.model.create(user);
    }

    public async deleteById(id: string): Promise<void> {
        const FILTER = { _id: id };
        const RESULT = await this.model.deleteOne(FILTER);
        if (RESULT.deletedCount < 1) {
            throw new HttpError(`No user with id ${id} to be deleted`, 404);
        }
    }

    public async findById(id: string): Promise<User> {
        const USER = await this.model.findById(id);
        if (!USER) {
            throw new HttpError(`No user with id ${id} found`, 404);
        }
        return USER;
    }

    public async update(user: User): Promise<void> {
        const FILTER = { _id: user._id };
        const RESULT = await this.model.updateOne(FILTER, user);
        if (RESULT.modifiedCount < 1) {
            throw new HttpError(
                `No user with id ${user._id} to be updated`,
                404
            );
        }
    }
}