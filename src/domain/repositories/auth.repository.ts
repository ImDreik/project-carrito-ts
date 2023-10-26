import { LoginUserDto, RegisterUserDto, UserEntity } from "..";



export abstract class AuthRepository{

    abstract register( registerUserDto: RegisterUserDto): Promise<UserEntity>

    abstract login( loginUserDto: LoginUserDto): Promise<UserEntity>

}