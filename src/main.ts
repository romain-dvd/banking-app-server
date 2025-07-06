import { openDatabaseConnection } from "./core/database";
import { parseEnvironment } from "./core/environment";
import { startServer } from "./core/server";

const main = async (): Promise<void> => {
    const ENVIRONMENT = parseEnvironment(process.env);
    await openDatabaseConnection(ENVIRONMENT.databaseUri);
    startServer(ENVIRONMENT.serverPort);
};

main().catch(console.error);