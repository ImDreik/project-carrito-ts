import { CategoryEntity, CreateCategoryDto, UserEntity } from "..";



export abstract class CategoryDatasource {

    abstract create( createCategoryDto: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity>
    
}