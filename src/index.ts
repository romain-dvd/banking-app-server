import { connectToMongoDB } from "./core/database";
import { parseEnvironment } from "./core/environment";
import { startServer } from "./core/server";

const main = async (): Promise<void> => {
    const ENVIRONMENT = parseEnvironment(process.env);
    await connectToMongoDB(ENVIRONMENT.mongoUri);
    startServer(ENVIRONMENT.port);
};

main().catch(console.error);