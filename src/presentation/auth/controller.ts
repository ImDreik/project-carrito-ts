import { Request, Response } from "express";
import { AuthRepository, CustomError, LoginUser, LoginUserDto, RegisterUser, RegisterUserDto } from "../../domain";




export class AuthContoller {
    

    constructor(
        private readonly authRepository: AuthRepository
    ){}


    private handleError = ( error: unknown, res: Response) => {
        if(error instanceof CustomError){
            console.log(error);
            return res.status(error.statusCode).json({error: error.message})
        }
    }


    register = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if(error) return res.status(400).json({error: error});

        new RegisterUser(this.authRepository)
          .execute(registerUserDto!)
          .then(data => res.json(data))
          .catch(error => this.handleError(error, res));
    }


    login = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if(error) return res.status(400).json({error: error});

        new LoginUser(this.authRepository)
          .execute(loginUserDto!)
          .then(data => res.json(data))
          .catch(error => this.handleError(error, res));
    }


    validateEmail = (req: Request, res: Response) => {
        res.json('validateEmail');
    }

}