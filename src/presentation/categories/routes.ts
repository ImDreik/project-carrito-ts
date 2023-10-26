import { Router } from "express";
import { CategoryContoller } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { CategoryDatasourceImpl, CategoryRepositoryImpl } from "../../infrastructure";



export class CategoryRoutes {



    static get routes(): Router {

        const router = Router();

        const categoryDatasoruce = new CategoryDatasourceImpl(
            // Posible inyeccion de dependencias
        )
        const categoryRepository = new CategoryRepositoryImpl(categoryDatasoruce);
        const categoryController = new CategoryContoller(categoryRepository);

        // Definicion de rutas
        router.get('/', categoryController.getAll);
        router.post('/',[ AuthMiddleware.validateJWT ], categoryController.create);
        

        return router;
    }
}