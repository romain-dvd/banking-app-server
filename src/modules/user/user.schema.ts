import mongoose from 'mongoose';

import type { Schema, SchemaDefinition, SchemaOptions } from 'mongoose';
import type { User } from './user.type';

const createUserSchemaDefinition = (): Readonly<SchemaDefinition<User>> => {
    return {
        firstname: { required: true, type: String },
        lastname: { required: true, type: String },
        key: { required: true, type: String },
        password: { required: true, type: String },
    };
};

const createUserSchemaOptions = (): Readonly<SchemaOptions> => {
    const TIMESTAMP_ENABLED = true;
    return { timestamps: TIMESTAMP_ENABLED };
};

export const createUserSchema = (): Readonly<Schema<User>> => {
    const DEFINITION = createUserSchemaDefinition();
    const OPTIONS = createUserSchemaOptions();
    return new mongoose.Schema(DEFINITION, OPTIONS);
};