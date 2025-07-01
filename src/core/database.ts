import { connect, ConnectOptions, Mongoose } from 'mongoose';
import errorCatcher from '../utils/error-catcher';

const createOptions = (): Readonly<ConnectOptions> => {
    const SANITIZE_FILTER_ENBALED = true;
    const TIMEOUT = 10000;
    return {
        sanitizeFilter: SANITIZE_FILTER_ENBALED,
        timeoutMS: TIMEOUT
    };
};

export const connectToMongoDB = async (uri: string): Promise<Mongoose> => {
    try {
        const OPTIONS = createOptions();
        const DATABSE = await connect(uri, OPTIONS);
        console.log('Database connected');
        return DATABSE;
    } catch (error) {
        return errorCatcher.handleFatalError(
            `Error connecting database: ${error}`
        );
    }
};