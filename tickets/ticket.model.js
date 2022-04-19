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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = exports.TicketState = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const category_entity_1 = require("../categories/category.entity");
const message_entity_1 = require("../messages/message.entity");
const users_model_1 = require("../users/users.model");
var TicketState;
(function (TicketState) {
    TicketState["CLOSED"] = "\u0417\u0430\u044F\u0432\u043A\u0430 \u0437\u0430\u043A\u0440\u044B\u0442\u0430";
    TicketState["CANCELED"] = "\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043E\u0437\u0432\u0430\u043D\u0430";
    TicketState["INWORK"] = "\u0417\u0430\u044F\u0432\u043A\u0430 \u0432 \u0440\u0430\u0431\u043E\u0442\u0435";
    TicketState["WAITFORCONFRIMATION"] = "\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0436\u0438\u0434\u0430\u0435\u0442 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F";
    TicketState["COMPLETED"] = "\u0417\u0430\u044F\u0432\u043A\u0430 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430";
})(TicketState = exports.TicketState || (exports.TicketState = {}));
let Ticket = class Ticket extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Ticket.prototype, "theme", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_entity_1.Category),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Ticket.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_entity_1.Category),
    __metadata("design:type", category_entity_1.Category)
], Ticket.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(TicketState.INWORK),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Ticket.prototype, "state", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => message_entity_1.Message),
    __metadata("design:type", Array)
], Ticket.prototype, "messages", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Ticket.prototype, "applicantId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Ticket.prototype, "workerId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User, { as: "Applicant" }),
    __metadata("design:type", users_model_1.User)
], Ticket.prototype, "applicant", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User, { as: "Worker" }),
    __metadata("design:type", users_model_1.User)
], Ticket.prototype, "worker", void 0);
Ticket = __decorate([
    sequelize_typescript_1.Table
], Ticket);
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.model.js.map