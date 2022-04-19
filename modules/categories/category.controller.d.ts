import { CategoryDto } from 'src/modules/categories/category.dto';
import { CategoryService } from 'src/modules/categories/category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<import("./category.model").Category[]>;
    findAllPaging(page: number, elements: number): Promise<{
        rows: import("./category.model").Category[];
        count: number;
    }>;
    create(categoryDto: CategoryDto): Promise<import("./category.model").Category>;
    findOne(id: string): Promise<import("./category.model").Category>;
    update(id: string, categoryDto: CategoryDto): Promise<import("./category.model").Category>;
}
