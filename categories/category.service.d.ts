import { Category } from 'src/modules/categories/category.entity';
import { CategoryDto } from 'src/modules/categories/category.dto';
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: typeof Category);
    findAll(): Promise<Category[]>;
    create(categoryDto: CategoryDto): Promise<Category>;
    findOne(id: string): Promise<Category>;
    update(id: string, categoryDto: CategoryDto): Promise<Category>;
    remove(id: string): Promise<void>;
}
