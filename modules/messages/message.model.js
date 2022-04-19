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
exports.Message = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const ticket_model_1 = require("../tickets/ticket.model");
const users_model_1 = require("../users/users.model");
let Message = class Message extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Message.prototype, "text", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => users_model_1.User),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Message.prototype, "userId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ticket_model_1.Ticket),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Message.prototype, "ticketId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User),
    __metadata("design:type", users_model_1.User)
], Message.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ticket_model_1.Ticket),
    __metadata("design:type", ticket_model_1.Ticket)
], Message.prototype, "ticket", void 0);
Message = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        attributes: ["id", "text", "createdAt", "userId", "ticketId"],
        include: [
            {
                model: users_model_1.User,
                attributes: ["firstName", "secondName"]
            },
        ],
        order: [["createdAt", "DESC"]]
    })),
    sequelize_typescript_1.Table
], Message);
exports.Message = Message;
//# sourceMappingURL=message.model.js.map