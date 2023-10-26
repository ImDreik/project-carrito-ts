import { compareSync, hashSync } from 'bcryptjs'


export class HashingAdapter {


    static hash( password: string): string {
        return hashSync(password);
    }


    static compare(password: string, passwordHashed: string): boolean{
        return compareSync(password, passwordHashed);
    }


}