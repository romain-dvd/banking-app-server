import mongoose from "mongoose";
import { throwFatal } from "../helpers/error";

import type { Mongoose, MongooseOptions } from "mongoose";

const createMongooseOptions = (): MongooseOptions => {
    const SANITIZE_FILTER_ENABLED = true;
    return { sanitizeFilter: SANITIZE_FILTER_ENABLED };
};

const connectMongoose = (uri: string): Promise<Mongoose> => {
    const OPTIONS = createMongooseOptions();
    return mongoose.connect(uri, OPTIONS);
};

export const openDatabaseConnection = async (uri: string): Promise<unknown> => {
    try {
        const CONNECTION = await connectMongoose(uri);
        console.log('Database connected');
        return CONNECTION;
    } catch (error) {
        return throwFatal(`Fatal error: trying to connect to database: ${error}`);
    }
};