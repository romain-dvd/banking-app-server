import { handleFatalError } from "../utils/error-catcher";

/**
 * Environment of the app (corersponding to .env file expected content).
 */
interface Environment {
    mongoUri: string;
    port: number;
}

/**
 * Tell if a number is valid or not as a listening port.
 * 
 * @param port Number to test.
 * @returns True if it's valid, else false.
 */
const isPortValid = (port: number): boolean => {
    return Number.isInteger(port) && port > 0;
};

/**
 * Tell if a value is valid or not as a MongoDB connection string.
 * 
 * @param uri Value to test.
 * @returns True if it's valid, else false.
 */
const isUriValid = (uri?: string): uri is string => {
    return !!uri && uri.trim().length > 0;
};

/**
 * Parse a value as a listening port. If the value is invalid, throw a fatal 
 * error.
 * 
 * @param value Value to parse.
 * @returns Number.
 */
const parsePort = (value?: string): number => {
    const PORT = Number(value);
    if (isPortValid(PORT)) {
        return PORT;
    }
    return handleFatalError(`Error: invalid listening port: "value"`);
};

/**
 * Parse a value as a MongoDB connection string. If the value is invalid, throw
 * a fatal error.
 * 
 * @param value Value to parse.
 * @returns String.
 */
const parseUri = (value?: string): string => {
    if (isUriValid(value)) {
        return value;
    }
    return handleFatalError(`Error: invalid connexion string: "value"`);
};

/**
 * Parse environment provided by .env file and return values as a typed variant.
 * If a value is invalid, throw a fatal error.
 * 
 * @param env Instance of NodeJS.ProcessEnv.
 * @returns Instance of Environment.
 */
export const parseEnvironment = (env: NodeJS.ProcessEnv): Readonly<Environment> => {
    const MONGO_URI = parseUri(env['MONGO_URI']);
    const PORT = parsePort(env['PORT']);
    console.log('Environment parsed');
    return {
        mongoUri: MONGO_URI,
        port: PORT,
    };
};