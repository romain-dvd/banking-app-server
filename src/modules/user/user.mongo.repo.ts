import { getUserModel } from "./user.model";

import type { UserRepo } from "./user.repo";
import type { User } from "./user.type";

export class UserMongoRepo implements UserRepo {
    private readonly model = getUserModel();

    public create = async (user: User): Promise<void> => {
        await this.model.create(user);
    };

    public deleteById = async (id: string): Promise<boolean> => {
        const RESULT = await this.model.deleteOne({ _id: id });
        return RESULT.deletedCount > 0;
    };

    public findById = async (id: string): Promise<User | null> => {
        const DOCUMENT = await this.model.findById(id);
        return DOCUMENT?.toJSON() || null;
    };

    public update = async (user: User): Promise<boolean> => {
        const RESULT = await this.model.updateOne({ _id: user._id }, user);
        return RESULT.modifiedCount > 0;
    };
}