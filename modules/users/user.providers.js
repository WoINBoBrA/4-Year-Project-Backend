"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProviders = void 0;
const constants_1 = require("../../core/constants");
const users_model_1 = require("./users.model");
exports.userProviders = [{
        provide: constants_1.USER_REPOSITORY,
        useValue: users_model_1.User,
    }];
//# sourceMappingURL=user.providers.js.map