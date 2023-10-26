import { CategoryModel } from "../../data";
import { CategoryDatasource, CategoryEntity, CreateCategoryDto, CustomError, UserEntity } from "../../domain";




export class CategoryDatasourceImpl implements CategoryDatasource {

    constructor(
        // DI

    ){}

    async create(createCategoryDto: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity> {
        
        try {

            const categoryExists = await CategoryModel.findOne({name: createCategoryDto.name});
            if( categoryExists ) throw CustomError.badRequest('Category already exists');

            const newCategory = new CategoryModel({
                ...createCategoryDto,
                user: user.id
            });
            await newCategory.save();

            return new CategoryEntity(
                newCategory.id,
                newCategory.name!,
                newCategory.available
            )
            
        } catch (error) {
            throw CustomError.internalServer(`${ error }`)
        }
    }

}