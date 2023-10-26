import { CategoryDatasource, CategoryEntity, CategoryRepository, CreateCategoryDto, UserEntity } from "../../domain";




export class CategoryRepositoryImpl implements CategoryRepository {

    constructor(
        private readonly categoryDatasource: CategoryDatasource
    ){}

    create(createCategoryDto: CreateCategoryDto, user: UserEntity): Promise<CategoryEntity> {
        return this.categoryDatasource.create(createCategoryDto, user);
    }

}