import mongoose from 'mongoose';

import type { Schema, SchemaDefinition, SchemaOptions } from 'mongoose';
import type { Account } from './account.type';

const createAccountSchemaDefinition = (): Readonly<SchemaDefinition<Account<string>>> => {
    return {
        baseAmount: { required: true, type: Number },
        label: { required: true, type: String },
        personal: { required: true, type: Boolean }
    };
};

const createAccountSchemaOptions = (): Readonly<SchemaOptions> => {
    const TIMESTAMP_ENABLED = true;
    return { timestamps: TIMESTAMP_ENABLED };
};

export const createAccountSchema = (): Readonly<Schema<Account<string>>> => {
    const DEFINITION = createAccountSchemaDefinition();
    const OPTIONS = createAccountSchemaOptions();
    return new mongoose.Schema(DEFINITION, OPTIONS);
};