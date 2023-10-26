import { JwtAdapter } from "../../../config";
import { AuthRepository, CustomError, LoginUserDto } from "../..";


interface SigninUser{
    user:{
        id: string,
        name: string,
        email: string,
        emailValidated: boolean,
        roles: string[]
    },
    token:string
}

interface LoginUserUseCase {
    execute(loginUserDto: LoginUserDto): Promise<SigninUser>
}

type SingToken = (payload: Object, duration?: string) => Promise<string | null>


export class LoginUser implements LoginUserUseCase{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly singToken: SingToken = JwtAdapter.generateToken
    ){}

    async execute(loginUserDto: LoginUserDto): Promise<SigninUser> {
        
        const user = await this.authRepository.login(loginUserDto);
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