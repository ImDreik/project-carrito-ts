import { Router } from "express";
import { CategoryService } from "../Services";
import { CategoryContoller } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";



export class CategoryRoutes {



    static get routes(): Router {

        const router = Router();

        const categoryService = new CategoryService();
        const categoryController = new CategoryContoller(categoryService);

        // Definicion de rutas
        router.get('/', categoryController.getAll);
        router.post('/',[ AuthMiddleware.validateJWT ], categoryController.create);
        

        return router;
    }
}