import { Router } from "express";
import { AuthRouter } from "./auth/routes";
import { CategoryRoutes } from "./categories/routes";



export class AllRoutes{
    
    static get routes(): Router{

        const routes = Router();

        routes.use('/auth', AuthRouter.routes);
        routes.use('/categories', CategoryRoutes.routes);

        return routes;
    }
}