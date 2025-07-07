import mongoose from "mongoose";
import { createUserSchema } from "./user.schema";

import type { Model } from 'mongoose';
import type { User } from "./user.type";

const createUserModel = (name: string): Readonly<Model<User>> => {
    const SCHEMA = createUserSchema();
    return mongoose.model(name, SCHEMA);
};

export const getUserModel = (): Readonly<Model<User>> => {
    const NAME = 'User';
    return mongoose.models[NAME] as Model<User> || createUserModel(NAME);
};