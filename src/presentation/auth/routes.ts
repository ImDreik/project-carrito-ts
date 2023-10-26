import { Router } from "express";
import { EmailService } from "../Services";
import { AuthContoller } from "./controller";
import { HashingAdapter, JwtAdapter, envs } from "../../config";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";


export class AuthRouter{


    static get routes(): Router{

        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        );
        const datasource = new AuthDatasourceImpl(
            HashingAdapter.hash,
            HashingAdapter.compare,
            emailService
        );
        const authRepository = new AuthRepositoryImpl(datasource);
        const authController = new AuthContoller(authRepository);

        router.post('/register', authController.register);
        router.post('/login', authController.login);

        router.get('/validate-email/:token', authController.validateEmail);

        return router
    }
}