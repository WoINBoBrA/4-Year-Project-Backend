"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../core/constants");
const category_business_error_1 = require("../../shared/errors/category/category.business-error");
let CategoryService = class CategoryService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    findAll() {
        return this.categoryModel.findAll();
    }
    findAllPaging(page, elements) {
        if (page <= 0) {
            common_1.Logger.error(`Page must be more than 0`, '', 'CategoryService', true);
            throw new common_1.NotFoundException(category_business_error_1.CategoryBusinessErrors.NotFound);
        }
        if (elements <= 0) {
            common_1.Logger.error(`Elements must be more than 0`, '', 'CategoryService', true);
            throw new common_1.NotFoundException(category_business_error_1.CategoryBusinessErrors.NotFound);
        }
        return this.categoryModel.findAndCountAll({ limit: elements, offset: elements * (page - 1) });
    }
    async findOne(id) {
        const category = await this.categoryModel.findByPk(id);
        if (!category) {
            common_1.Logger.error(`Couldn't find category with id = ${id}`, '', 'CategoryService', true);
            throw new common_1.NotFoundException(category_business_error_1.CategoryBusinessErrors.NotFound);
        }
        return category;
    }
    create(categoryDto) {
        return this.categoryModel.create(Object.assign({}, categoryDto));
    }
    async update(id, categoryDto) {
        const category = await this.categoryModel.findByPk(id);
        if (!category) {
            common_1.Logger.error(`Couldn't find category with id = ${id}`, '', 'CategoryService', true);
            throw new common_1.NotFoundException(category_business_error_1.CategoryBusinessErrors.NotFound);
        }
        return category.update(Object.assign({}, categoryDto));
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.CATEGORY_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map