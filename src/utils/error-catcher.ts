export const handleFatalError = (message: string, code?: number): never => {
    console.error(message);
    return process.exit(code);
};