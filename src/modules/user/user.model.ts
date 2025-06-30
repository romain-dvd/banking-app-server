import { model, Model, models } from "mongoose";
import userSchema from "./user.schema";
import { User } from "./user.type";

const create = (name: string): Readonly<Model<User>> => {
    const SCHEMA = userSchema();
    return model(name, SCHEMA);
};

const userModel = (): Readonly<Model<User>> => {
    const NAME = 'User';
    return models[NAME] as Model<User> || create(NAME);
};

export default userModel;