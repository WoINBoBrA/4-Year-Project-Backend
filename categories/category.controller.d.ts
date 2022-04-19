import { CategoryDto } from 'src/modules/categories/category.dto';
import { CategoryService } from 'src/modules/categories/category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAll(): any;
    create(categoryDto: CategoryDto): any;
    findOne(id: string): any;
    update(id: string, categoryDto: CategoryDto): any;
    remove(id: string): any;
}
