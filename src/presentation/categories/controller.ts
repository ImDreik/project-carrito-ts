import { Request, Response } from "express";
import { CategoryRepository, CreateCategoryDto, CustomError } from "../../domain";




export class CategoryContoller {
    

    constructor(
        private readonly categoryRepository: CategoryRepository
    ){}


    private handleError = ( error: unknown, res: Response) => {
        if(error instanceof CustomError){
            console.log(error);
            return res.status(error.statusCode).json({error: error.message})
        }

        console.log(`${ error }`);
        return res.status(500).json({error: 'Internal Server Error'});
    }


    create = (req: Request, res: Response) => {

        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
        if(error) return res.status(400).json({error: error});

        this.categoryRepository.create(createCategoryDto! , req.body.user!)
            .then(data => res.json(data))
            .catch(error => this.handleError(error, res));
    }


    getAll = (req: Request, res: Response) => {

        res.json('Get Category');
       
    }

}