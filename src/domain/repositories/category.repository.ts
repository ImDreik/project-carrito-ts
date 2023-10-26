import { CategoryEntity, CreateCategoryDto, UserEntity } from "..";



export abstract class CategoryRepository {

    abstract create(createCategoryDto: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity>
    
}