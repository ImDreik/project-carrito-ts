import { RegularExps } from "../../../config";


export class LoginUserDto{

    private constructor(
        public email: string,
        public password: string
    ){}


    static create (object: { [key: string]: any }): [string?, LoginUserDto?]{

        const { email, password } = object;

        if (!email) return ['Missing email'];
        if (!RegularExps.email.test(email)) return ['Email is not valid'];
        if (!password) return ['Missing password'];
        if (password.length < 8 ) return ['Password too short'];
        
        return [
            undefined,
            new LoginUserDto(email.toLowerCase(), password.trim())
        ];

    }


}