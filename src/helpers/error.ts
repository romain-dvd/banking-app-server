export const throwFatal = (message: string, code?: number): never => {
    console.error(message);
    return process.exit(code);
};