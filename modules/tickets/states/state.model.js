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
exports.State = exports.TicketState = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const ticket_model_1 = require("../ticket.model");
var TicketState;
(function (TicketState) {
    TicketState[TicketState["CLOSED"] = 0] = "CLOSED";
    TicketState[TicketState["INWORK"] = 1] = "INWORK";
    TicketState[TicketState["WAITFORCONFRIMATION"] = 2] = "WAITFORCONFRIMATION";
    TicketState[TicketState["COMPLETED"] = 3] = "COMPLETED";
    TicketState[TicketState["CANCELED"] = 4] = "CANCELED";
})(TicketState = exports.TicketState || (exports.TicketState = {}));
let State = class State extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], State.prototype, "state", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(true),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], State.prototype, "active", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => ticket_model_1.Ticket),
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], State.prototype, "ticketId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => ticket_model_1.Ticket),
    __metadata("design:type", ticket_model_1.Ticket)
], State.prototype, "ticket", void 0);
State = __decorate([
    (0, sequelize_typescript_1.DefaultScope)(() => ({
        attributes: ["state", "createdAt", "ticketId"]
    })),
    sequelize_typescript_1.Table
], State);
exports.State = State;
//# sourceMappingURL=state.model.js.map