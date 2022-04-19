import { USER_REPOSITORY } from "src/core/constants";
import { User } from "./users.model";

export const userProviders = [{
  provide: USER_REPOSITORY,
  useValue: User,
}];