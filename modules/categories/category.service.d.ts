import { Category } from 'src/modules/categories/category.model';
import { CategoryDto } from 'src/modules/categories/category.dto';
export declare class CategoryService {
    private readonly categoryModel;
    constructor(categoryModel: typeof Category);
    findAll(): Promise<Category[]>;
    findAllPaging(page: number, elements: number): Promise<{
        rows: Category[];
        count: number;
    }>;
    findOne(id: string): Promise<Category>;
    create(categoryDto: CategoryDto): Promise<Category>;
    update(id: string, categoryDto: CategoryDto): Promise<Category>;
}
