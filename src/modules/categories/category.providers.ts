import { CATEGORY_REPOSITORY } from "src/core/constants";
import { Category } from "./category.model";

export const categoryProviders = [{
    provide: CATEGORY_REPOSITORY,
    useValue: Category,
}];