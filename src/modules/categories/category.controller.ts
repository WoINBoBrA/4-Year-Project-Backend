import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CategoryDto } from 'src/modules/categories/category.dto';
import { CategoryService } from 'src/modules/categories/category.service';
import { Roles } from 'src/roles/role.decorator';
import { Role } from 'src/roles/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('categories')
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
      ) {}

    @Get('')
    @Roles(Role.ADMIN,Role.USER,Role.TECHSUPPORT)
    findAll() {
        return this.categoryService.findAll();
    }


    @Get('config/page:page/elements:elements')
    @Roles(Role.ADMIN,Role.USER,Role.TECHSUPPORT)
    findAllPaging(@Param('page') page: number, @Param('elements') elements: number) {
        return this.categoryService.findAllPaging(page,elements);
    }

    @Post()
    @Roles(Role.ADMIN)
    create(@Body() categoryDto: CategoryDto) {
        return this.categoryService.create(categoryDto);
    }

    @Get(':id')
    @Roles(Role.ADMIN)
    findOne(@Param('id') id: string) {
        return this.categoryService.findOne(id);
    }

    @Put(':id')
    @Roles(Role.ADMIN)
    update(@Param('id') id: string, @Body() categoryDto: CategoryDto) {
        return this.categoryService.update(id, categoryDto);
    }
    
}