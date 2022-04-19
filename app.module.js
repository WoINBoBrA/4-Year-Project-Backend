"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const ticket_module_1 = require("./modules/tickets/ticket.module");
const category_module_1 = require("./modules/categories/category.module");
const database_module_1 = require("./core/database/database.module");
const config_1 = require("@nestjs/config");
const moment = require("moment-timezone");
const constants_1 = require("./core/constants");
const state_providers_1 = require("./modules/tickets/states/state.providers");
const ticket_providers_1 = require("./modules/tickets/ticket.providers");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            database_module_1.DatabaseModule, auth_module_1.AuthModule, users_module_1.UsersModule, ticket_module_1.TicketModule, category_module_1.CategoryModule, database_module_1.DatabaseModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: constants_1.MOMENT_WRAPPER,
                useValue: moment
            },
            ...state_providers_1.stateProviders,
            ...ticket_providers_1.ticketProviders,
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map