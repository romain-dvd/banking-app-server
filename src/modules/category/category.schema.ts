import mongoose from 'mongoose';

import type { Schema, SchemaDefinition, SchemaOptions } from 'mongoose';
import type { Category } from './category.type';

const createCategorySchemaDefinition = (): Readonly<SchemaDefinition<Category>> => {
    return {
        label: { required: true, type: String },
    };
};

const createCategorySchemaOptions = (): Readonly<SchemaOptions> => {
    const TIMESTAMP_ENABLED = true;
    return { timestamps: TIMESTAMP_ENABLED };
};

export const createCategorySchema = (): Readonly<Schema<Category>> => {
    const DEFINITION = createCategorySchemaDefinition();
    const OPTIONS = createCategorySchemaOptions();
    return new mongoose.Schema(DEFINITION, OPTIONS);
};