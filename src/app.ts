import { envs } from "./config";
import { MongoDatabase } from "./data";
import { Server } from "./presentation/server"
import { AllRoutes } from "./presentation/routes";


(() => {
	main();
})();

async function main() {

	await MongoDatabase.connect({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_DB_NAME
	});

	new Server({
		PORT: envs.PORT,
		routes: AllRoutes.routes
	})
		.start();
}
