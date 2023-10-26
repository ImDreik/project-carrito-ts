import { CustomError } from "..";


export class UserEntity{


    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public role: string[],
        public emailValidated?: boolean,
        public img?: string
    ){}


    static fromObject(object: {[key: string]: any}) {

        const { id, _id, name, email,password, roles, emailValidated } = object;

        if(!id || !_id) throw CustomError.badRequest('Missing id -> database');
        if(!name) throw CustomError.badRequest('Missing name -> database');
        if(!email) throw CustomError.badRequest('Missing email -> database');
        if(emailValidated === undefined) throw CustomError.badRequest('Missing emailvalidated -> database');
        if(!password) throw CustomError.badRequest('Missing password -> database');
        if(!roles) throw CustomError.badRequest('Missing roles -> database');
        
        return new UserEntity(
            id || _id,
            name,
            email,
            password,
            roles,
            emailValidated 
        );
    }

    
}