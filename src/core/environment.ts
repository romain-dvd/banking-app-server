import { throwFatal } from "../helpers/error";

interface Environment {
    databaseUri: string;
    serverPort: number;
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
    return throwFatal(`Error: trying to parse server port: ${value}`);
};

const parseUri = (value?: string): string => {
    if (isUriValid(value)) {
        return value;
    }
    return throwFatal(`Error: trying to parse database uri: ${value}`);
};

export const parseEnvironment = (environment: NodeJS.ProcessEnv): Environment => {
    const DATABASE_URI = parseUri(environment['DATABASE_URI']);
    const SERVER_PORT = parsePort(environment['SERVER_PORT']);
    console.log('Environment parsed');
    return {
        databaseUri: DATABASE_URI,
        serverPort: SERVER_PORT
    };
};