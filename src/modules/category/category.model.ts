import mongoose from "mongoose";
import { createCategorySchema } from "./category.schema";

import type { Model } from 'mongoose';
import type { Category } from "./category.type";

const createCategoryModel = (name: string): Readonly<Model<Category>> => {
    const SCHEMA = createCategorySchema();
    return mongoose.model(name, SCHEMA);
};

export const getCategoryModel = (): Readonly<Model<Category>> => {
    const NAME = 'Category';
    return mongoose.models[NAME] as Model<Category> || createCategoryModel(NAME);
};