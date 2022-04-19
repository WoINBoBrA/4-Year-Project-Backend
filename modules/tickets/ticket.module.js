"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../core/database/database.module");
const category_providers_1 = require("../categories/category.providers");
const message_providers_1 = require("../messages/message.providers");
const user_providers_1 = require("../users/user.providers");
const state_providers_1 = require("./states/state.providers");
const ticket_controller_1 = require("./ticket.controller");
const ticket_providers_1 = require("./ticket.providers");
const ticket_service_1 = require("./ticket.service");
let TicketModule = class TicketModule {
};
TicketModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: [ticket_service_1.TicketService, ...ticket_providers_1.ticketProviders, ...message_providers_1.messageProviders, ...user_providers_1.userProviders, ...category_providers_1.categoryProviders, ...state_providers_1.stateProviders],
        exports: [ticket_service_1.TicketService],
        controllers: [ticket_controller_1.TicketController],
    })
], TicketModule);
exports.TicketModule = TicketModule;
//# sourceMappingURL=ticket.module.js.map