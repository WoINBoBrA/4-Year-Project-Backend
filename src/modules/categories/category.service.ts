import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Category } from 'src/modules/categories/category.model';
import { CategoryDto } from 'src/modules/categories/category.dto';
import { CATEGORY_REPOSITORY } from 'src/core/constants';
import { CategoryBusinessErrors } from 'src/shared/errors/category/category.business-error';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(CATEGORY_REPOSITORY) private readonly categoryModel: typeof Category,
  ) {}


  findAll(): Promise<Category[]>{
    return this.categoryModel.findAll();
  }

  findAllPaging(page: number, elements: number): Promise<{rows:Category[],count:number}> {
    if(page<=0){
      Logger.error(`Page must be more than 0`,'','CategoryService',true);
      throw new NotFoundException(CategoryBusinessErrors.NotFound);
    }

    if(elements<=0){
      Logger.error(`Elements must be more than 0`,'','CategoryService',true);
      throw new NotFoundException(CategoryBusinessErrors.NotFound);
    }

    return this.categoryModel.findAndCountAll({limit:elements, offset:elements*(page-1)});
  }

  async findOne(id: string): Promise<Category> {

    const category = await this.categoryModel.findByPk(id);
    if(!category) {
      Logger.error(`Couldn't find category with id = ${id}`,'','CategoryService',true);
      throw new NotFoundException(CategoryBusinessErrors.NotFound);
    }

    return category;
  }

  create(categoryDto: CategoryDto): Promise<Category> {
    return this.categoryModel.create({...categoryDto});
  }


  async update(id: string, categoryDto: CategoryDto): Promise<Category> {
    const category = await this.categoryModel.findByPk(id);
    if(!category) {
      Logger.error(`Couldn't find category with id = ${id}`,'','CategoryService',true);
      throw new NotFoundException(CategoryBusinessErrors.NotFound);
    }
    return category.update({ ...categoryDto});
  }


}