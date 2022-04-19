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
exports.Ticket = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const category_model_1 = require("../categories/category.model");
const message_model_1 = require("../messages/message.model");
const users_model_1 = require("../users/users.model");
const state_model_1 = require("./states/state.model");
let Ticket = class Ticket extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Ticket.prototype, "theme", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => category_model_1.Category),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Ticket.prototype, "categoryId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => category_model_1.Category),
    __metadata("design:type", category_model_1.Category)
], Ticket.prototype, "category", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => message_model_1.Message),
    __metadata("design:type", Array)
], Ticket.prototype, "messages", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => state_model_1.State),
    __metadata("design:type", state_model_1.State)
], Ticket.prototype, "states", void 0);
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
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User, { foreignKey: "applicantId", as: "applicant" }),
    __metadata("design:type", users_model_1.User)
], Ticket.prototype, "applicant", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => users_model_1.User, { foreignKey: "workerId", as: "worker" }),
    __metadata("design:type", users_model_1.User)
], Ticket.prototype, "worker", void 0);
Ticket = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        attributes: ["id", "theme", "categoryId", "workerId", "applicantId", "createdAt"],
        include: [
            {
                model: category_model_1.Category,
                attributes: ["name"]
            },
            {
                model: state_model_1.State,
                required: true,
                where: { active: true }
            },
            {
                model: users_model_1.User,
                as: "applicant",
                attributes: ["firstName", "secondName"]
            },
            {
                model: users_model_1.User,
                as: "worker",
                attributes: ["firstName", "secondName"]
            }
        ],
        order: [["createdAt", "DESC"]]
    })),
    (0, sequelize_typescript_1.Scopes)(() => ({
        one: {
            attributes: ["id", "theme", "categoryId", "workerId", "applicantId", "createdAt"],
            include: [
                {
                    model: category_model_1.Category,
                    attributes: ["name"]
                },
                {
                    model: state_model_1.State,
                    required: true,
                    where: { active: true }
                },
                {
                    model: users_model_1.User,
                    as: "applicant",
                    attributes: ["firstName", "secondName"]
                },
                {
                    model: users_model_1.User,
                    as: "worker",
                    attributes: ["firstName", "secondName"]
                },
                {
                    model: message_model_1.Message,
                }
            ],
            order: [["createdAt", "DESC"]]
        },
        basic: {
            attributes: ["id", "theme", "categoryId", "applicantId", "workerId", "createdAt"]
        }
    })),
    sequelize_typescript_1.Table
], Ticket);
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.model.js.map