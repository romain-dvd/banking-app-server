import mongoose from "mongoose";
import { createAccountSchema } from "./account.schema";

import type { Model } from 'mongoose';
import type { Account } from "./account.type";

const createAccountModel = (name: string): Readonly<Model<Account<string>>> => {
    const SCHEMA = createAccountSchema();
    return mongoose.model(name, SCHEMA);
};

export const getAccountModel = (): Readonly<Model<Account<string>>> => {
    const NAME = 'Account';
    return mongoose.models[NAME] as Model<Account<string>> || createAccountModel(NAME);
};