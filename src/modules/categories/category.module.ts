import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { categoryProviders } from './category.providers';
import { CategoryService } from './category.service';

@Module({
  imports: [],
  providers: [CategoryService, ...categoryProviders],
  exports: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}