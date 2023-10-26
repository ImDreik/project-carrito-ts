import { Router } from "express";
import { AuthService, EmailService } from "../Services";
import { AuthContoller } from "./controller";
import { HashingAdapter, JwtAdapter, envs } from "../../config";


export class AuthRouter{


    static get routes(): Router{

        const router = Router();

        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SEND_EMAIL
        );
        const authService = new AuthService(
            HashingAdapter.hash,
            HashingAdapter.compare,
            emailService
        );
        
        const authController = new AuthContoller(authService);

        router.post('/register', authController.register);
        router.post('/login', authController.login);

        router.get('/validate-email/:token', authController.validateEmail);

        return router
    }
}