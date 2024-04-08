import { JwtAdapter } from "../../../config";
import { CustomError, RegisterUserDto } from "../..";
import { AuthService } from "../../../presentation/Services";



interface NewUser{
    user:{
        id: string,
        name: string,
        email: string,
        emailValidated: boolean,
        roles: string[]
    },
    token:string
}

interface RegisterUserUseCase {
    execute(registerUserDto: RegisterUserDto): Promise<NewUser>
}

type SingToken = (payload: Object, duration?: string) => Promise<string | null>


export class RegisterUser implements RegisterUserUseCase{

    constructor(
        private readonly authService: AuthService,
        private readonly singToken: SingToken = JwtAdapter.generateToken
    ){}

    async execute(registerUserDto: RegisterUserDto): Promise<NewUser> {
        
        const user = await this.authService.register(registerUserDto);
        const token = await this.singToken({id: user.id}, '2h');
        if(!token) throw CustomError.internalServer('Error while creating JWT');

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                emailValidated: user.emailValidated!,
                roles: user.role
            },
            token: token
        }

    }
    
}