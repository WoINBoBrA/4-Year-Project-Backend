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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const ticket_model_1 = require("./ticket.model");
const category_entity_1 = require("../categories/category.entity");
const users_model_1 = require("../users/users.model");
const message_entity_1 = require("../messages/message.entity");
const role_enum_1 = require("../roles/role.enum");
let TicketService = class TicketService {
    constructor(ticketModel) {
        this.ticketModel = ticketModel;
    }
    findAll() {
        return this.ticketModel.findAll({ attributes: { include: ["theme", "state"] }, include: [
                { model: category_entity_1.Category, attributes: { include: ["name"] } },
                { model: users_model_1.User, as: "Applicant", attributes: { include: ["firstName", "secondName"] } },
                { model: users_model_1.User, as: "Worker", attributes: { include: ["firstName", "secondName"] } }
            ] });
    }
    async create(ticketDto, messageDto, user) {
        if (user.userId != ticketDto.applicantId)
            return null;
        const ticket = await this.ticketModel.create(Object.assign({}, ticketDto));
        ticket.$create('messages', Object.assign({}, messageDto));
        return ticket;
    }
    async createMessage(id, messageDto, user) {
        const ticket = await this.ticketModel.findByPk(id);
        if (user.userId != ticket.applicantId && user.Role == role_enum_1.Role.USER)
            return null;
        ticket.$create('messages', Object.assign({}, messageDto));
        return ticket;
    }
    findOne(id) {
        return this.ticketModel.findByPk(id, { attributes: { include: ["theme", "state"] }, include: [
                { model: category_entity_1.Category, attributes: { include: ["name"] } },
                { model: users_model_1.User, as: "Applicant", attributes: { include: ["firstName", "secondName"] } },
                { model: users_model_1.User, as: "Worker", attributes: { include: ["firstName", "secondName"] } },
                { model: message_entity_1.Message, attributes: { include: ["id", "text"] } }
            ] });
    }
    findByApplicant(id, user) {
        if (user.userId != id)
            return null;
        return this.ticketModel.findAll({ where: { applicantId: Number(id) }, attributes: { include: ["theme", "state"] }, include: [
                { model: category_entity_1.Category, attributes: { include: ["name"] } },
                { model: users_model_1.User, as: "Applicant", attributes: { include: ["firstName", "secondName"] } },
                { model: users_model_1.User, as: "Worker", attributes: { include: ["firstName", "secondName"] } }
            ] });
    }
    findByWorker(id, user) {
        if (user.userId != id)
            return null;
        return this.ticketModel.findAll({ where: { workerId: Number(id) }, attributes: { include: ["theme", "state"] }, include: [
                { model: category_entity_1.Category, attributes: { include: ["name"] } },
                { model: users_model_1.User, as: "Applicant", attributes: { include: ["firstName", "secondName"] } },
                { model: users_model_1.User, as: "Worker", attributes: { include: ["firstName", "secondName"] } }
            ] });
    }
    findByState(state) {
        return this.ticketModel.findAll({ where: { state: state }, attributes: { include: ["theme", "state"] }, include: [
                { model: category_entity_1.Category, attributes: { include: ["name"] } },
                { model: users_model_1.User, as: "Applicant", attributes: { include: ["firstName", "secondName"] } },
                { model: users_model_1.User, as: "Worker", attributes: { include: ["firstName", "secondName"] } }
            ] });
    }
    async cancelTicket(id, user) {
        const ticket = await this.ticketModel.findByPk(id);
        if (!ticket)
            return null;
        if (user.userId != ticket.applicantId)
            return null;
        return ticket.update({ state: ticket_model_1.TicketState.CANCELED });
    }
    async completeTicket(id) {
        const ticket = await this.ticketModel.findByPk(id);
        if (!ticket)
            return null;
        if (ticket.state != ticket_model_1.TicketState.INWORK)
            return null;
        return ticket.update({ state: ticket_model_1.TicketState.WAITFORCONFRIMATION });
    }
    async confirmTicket(id, user) {
        const ticket = await this.ticketModel.findByPk(id);
        if (!ticket)
            return null;
        if (user.userId != ticket.applicantId)
            return null;
        if (ticket.state != ticket_model_1.TicketState.WAITFORCONFRIMATION)
            return null;
        return ticket.update({ state: ticket_model_1.TicketState.COMPLETED });
    }
    async closeTicket(id) {
        const ticket = await this.ticketModel.findByPk(id);
        if (!ticket)
            return null;
        return ticket.update({ state: ticket_model_1.TicketState.CLOSED });
    }
    async rejectTicket(id, user) {
        const ticket = await this.ticketModel.findByPk(id);
        if (!ticket)
            return null;
        if (user.userId != ticket.applicantId)
            return null;
        if (ticket.state != ticket_model_1.TicketState.WAITFORCONFRIMATION)
            return null;
        return ticket.update({ state: ticket_model_1.TicketState.INWORK });
    }
};
TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(ticket_model_1.Ticket)),
    __metadata("design:paramtypes", [Object])
], TicketService);
exports.TicketService = TicketService;
//# sourceMappingURL=ticket.service.js.map