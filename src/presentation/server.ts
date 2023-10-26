import express, { Router } from 'express';
import path from 'path';

interface Options {
	PORT?: number;
	routes: Router,
	public_path?: string
}

export class Server {

	public readonly app = express();
	private readonly PORT: number;
	private readonly publicPath: string;
	private readonly routes: Router;

	constructor(options: Options) {
		const { PORT = 4001, routes, public_path = 'public' } = options

		this.PORT = PORT;
		this.publicPath = public_path;
		this.routes = routes;
	}

	async start() {

		//* Middlewares
		this.app.use(express.json()); // raw
		this.app.use(express.urlencoded({extended: true})); // x-www-from-urlencoded

		//* Public Folder
		this.app.use(express.static(this.publicPath));
		
		//* User rutas
		this.app.use('/api', this.routes);

		//* SPA
		this.app.use('*', (req, res) => {
			const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
			res.sendFile(indexPath);
		})

		this.app.listen(this.PORT, () => {
			console.log(`🚀 http://localhost:${this.PORT}`);
		})
	}


}