"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryProviders = void 0;
const constants_1 = require("../../core/constants");
const category_model_1 = require("./category.model");
exports.categoryProviders = [{
        provide: constants_1.CATEGORY_REPOSITORY,
        useValue: category_model_1.Category,
    }];
//# sourceMappingURL=category.providers.js.map