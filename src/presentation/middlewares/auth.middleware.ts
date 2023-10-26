import { UserModel } from "../../data";
import { UserEntity } from "../../domain";
import { JwtAdapter } from "../../config";
import { NextFunction, Request, Response } from "express";



export class AuthMiddleware{

    static validateJWT = async (req: Request, res: Response, next: NextFunction) => {

        const authorization = req.header('Authorization');
        if(!authorization) return res.status(401).json({error: 'No token provider'});
        if(!authorization.startsWith('Bearer'))  return res.status(401).json({error: 'Invalid Bearer token'});

        const token = authorization.split(' ').at(1) || '';

        try {

            const payload = await JwtAdapter.validateToken<{id: string}>(token);
            if(!payload) return res.status(401).json({error: 'Invalid token'});

            const user = await UserModel.findById(payload.id);
            if(!user) return res.status(401).json({error: 'Invalid token → user not found'});

            req.body.user = UserEntity.fromObject(user);

            next();
              
        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Internal Server Error'});
        }

    }



}