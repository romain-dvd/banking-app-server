import mongoose from "mongoose";
import { createTransactionSchema } from "./transaction.schema";

import type { Model } from 'mongoose';
import type { Transaction } from "./transaction.type";

const createTransactionModel = (name: string): Readonly<Model<Transaction<string, string, string>>> => {
    const SCHEMA = createTransactionSchema();
    return mongoose.model(name, SCHEMA);
};

export const getTransactionModel = (): Readonly<Model<Transaction<string, string, string>>> => {
    const NAME = 'Transaction';
    return mongoose.models[NAME] as Model<Transaction<string, string, string>> || createTransactionModel(NAME);
};