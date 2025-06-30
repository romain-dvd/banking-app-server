import { connect, ConnectOptions, Mongoose } from "mongoose";
import { handleFatalError } from "../utils/error-catcher";

/**
 * Create an instance of options to connect to MongoDB.
 * @returns Instance of ConnectOptions.
 */
const createOptions = (): Readonly<ConnectOptions> => {
    const SANITIZE_FILTER_ENBALED = true;
    const TIMEOUT = 10000;
    return {
        sanitizeFilter: SANITIZE_FILTER_ENBALED,
        timeoutMS: TIMEOUT
    };
};

/**
 * Connect Mongoose to a MongoDB cluster. Throw a fatal error if one occured.
 * @param uri Connection string to the cluster.
 * @returns Instance of Mongoose.
 */
export const connectToMongoDB = async (uri: string): Promise<Mongoose> => {
    try {
        const OPTIONS = createOptions();
        const DATABSE = await connect(uri, OPTIONS);
        console.log('Database connected');
        return DATABSE;
    } catch (error) {
        return handleFatalError(`Error connecting MongoDB: ${error}`);
    }
};