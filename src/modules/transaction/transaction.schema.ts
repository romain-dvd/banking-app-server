import mongoose from 'mongoose';

import type { Schema, SchemaDefinition, SchemaOptions } from 'mongoose';
import { getAccountModel } from '../account/account.model';
import { getCategoryModel } from '../category/category.model';
import type { Transaction, TransactionAccount } from './transaction.type';

const createTransactionAccountSchema = (): Schema<TransactionAccount<string, string>> => {
    return new mongoose.Schema({
        debtor: { ref: getAccountModel().modelName, required: true, type: String },
        origin: { ref: getAccountModel().modelName, required: true, type: String }
    }, { _id: false });
};

const createTransactionSchemaDefinition = (): Readonly<SchemaDefinition<Transaction<string, string, string>>> => {
    return {
        account: { required: true, type: createTransactionAccountSchema() },
        amount: { required: true, type: Number },
        category: { ref: getCategoryModel().modelName, required: true, type: [String] },
        date: { required: true, type: Date },
        observation: { type: String }
    };
};

const createTransactionSchemaOptions = (): Readonly<SchemaOptions> => {
    const TIMESTAMP_ENABLED = true;
    return { timestamps: TIMESTAMP_ENABLED };
};

export const createTransactionSchema = (): Readonly<Schema<Transaction<string, string, string>>> => {
    const DEFINITION = createTransactionSchemaDefinition();
    const OPTIONS = createTransactionSchemaOptions();
    return new mongoose.Schema(DEFINITION, OPTIONS);
};