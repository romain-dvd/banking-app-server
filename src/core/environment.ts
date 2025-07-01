import errorCatcher from '../utils/error-catcher';

interface Environment {
    mongoUri: string;
    port: number;
}

const isPortValid = (port: number): boolean => {
    return Number.isInteger(port) && port > 0;
};

const isUriValid = (uri?: string): uri is string => {
    return !!uri && uri.trim().length > 0;
};

const parsePort = (value?: string): number => {
    const PORT = Number(value);
    if (isPortValid(PORT)) {
        return PORT;
    }
    return errorCatcher.handleFatalError(
        `Error: invalid listening port: "value"`
    );
};

const parseUri = (value?: string): string => {
    if (isUriValid(value)) {
        return value;
    }
    return errorCatcher.handleFatalError(
        `Error: invalid connexion string: "value"`
    );
};

export const parseEnvironment = (env: NodeJS.ProcessEnv): Readonly<Environment> => {
    const MONGO_URI = parseUri(env['MONGO_URI']);
    const PORT = parsePort(env['PORT']);
    console.log('Environment parsed');
    return {
        mongoUri: MONGO_URI,
        port: PORT,
    };
};