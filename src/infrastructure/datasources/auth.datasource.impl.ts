import { UserModel } from "../../data";
import { JwtAdapter, envs } from "../../config";
import { EmailService } from "../../presentation/Services";
import { AuthDatasource, CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";


type HashFunction = (password: string) => string;
type ComprareFunction = (password: string, hashedPassword: string) => boolean;


export class AuthDatasourceImpl implements AuthDatasource{

    constructor(
        // Cualquier hash de password
        private readonly hashPassword: HashFunction,
        private readonly comparePassword: ComprareFunction,

        // Inyeccion del Servicio
        private readonly emailServices: EmailService
    ){}


    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {

        try {

            const singinUser =  await UserModel.findOne({email: loginUserDto.email});
            if(!singinUser) throw CustomError.badRequest('Check your credentials → email');
            if(!this.comparePassword(loginUserDto.password, singinUser.password!)) throw CustomError.badRequest('Check your credentials → password');

            return UserEntity.fromObject(singinUser);
            
        } catch (error) {

            if(error instanceof CustomError){
                throw error;
            }

            throw CustomError.internalServer('data base error');
            
        }


    }


    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        try {

            const isMatch = await UserModel.findOne({email: registerUserDto.email});
            if(isMatch) throw CustomError.badRequest('Email in use');

            const newUser = await UserModel.create({
                ...registerUserDto
            });

            await newUser.save();

            this.sendEmailValidationLink(newUser.email!);
            
            return UserEntity.fromObject(newUser);
            
        } catch (error) {

            if( error instanceof CustomError ){
                throw error;
            }

            throw CustomError.internalServer('Data base error');
            
        }


    }

    
    private sendEmailValidationLink = async (email: string) => {

        const token = await JwtAdapter.generateToken({ email });
        if(!token) throw CustomError.internalServer('Error getting token');

        const link = `${envs.WEB_SERVICE_URL}/auth/validate-email/${token}`;
        const html = `
            <h1>validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${ link }">Validate your email: ${ email }</a>
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            html: html
        }

        const isSet = await this.emailServices.sendEmail(options)
        if(!isSet) throw CustomError.internalServer('Error sendig email');

        return true;
    }



    
}