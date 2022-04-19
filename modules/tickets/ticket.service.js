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
const role_enum_1 = require("../../roles/role.enum");
const constants_1 = require("../../core/constants");
const category_business_error_1 = require("../../shared/errors/category/category.business-error");
const user_business_error_1 = require("../../shared/errors/user/user.business-error");
const ticket_business_error_1 = require("../../shared/errors/ticket/ticket.business-error");
const state_model_1 = require("./states/state.model");
const sequelize_typescript_1 = require("sequelize-typescript");
let TicketService = class TicketService {
    constructor(ticketModel, messageModel, categoryModel, userModel, stateModel, sequelize) {
        this.ticketModel = ticketModel;
        this.messageModel = messageModel;
        this.categoryModel = categoryModel;
        this.userModel = userModel;
        this.stateModel = stateModel;
        this.sequelize = sequelize;
    }
    async create(ticketDto, messageDto, user) {
        const category = await this.categoryModel.findByPk(ticketDto.categoryId);
        if (!category) {
            common_1.Logger.error(`Couldn't find category with id = ${ticketDto.categoryId}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(category_business_error_1.CategoryBusinessErrors.NotFound);
        }
        const applicant = await this.userModel.findByPk(user.userId);
        if (!applicant) {
            common_1.Logger.error(`Couldn't find user with id = ${user.userId}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(user_business_error_1.UserBusinessErrors.NotFound);
        }
        const ticket = await this.ticketModel.create(Object.assign(Object.assign({}, ticketDto), { applicantId: user.userId }));
        await this.stateModel.create({ state: state_model_1.TicketState.INWORK, ticketId: ticket.id });
        await this.messageModel.create({ text: messageDto.text, userId: user.userId, ticketId: ticket.id });
        return this.ticketModel.scope("one").findByPk(ticket.id);
    }
    async createMessage(id, messageDto, user) {
        const ticket = await this.ticketModel.scope("basic").findByPk(id);
        if (!ticket) {
            common_1.Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        const _user = await this.userModel.findByPk(user.userId);
        if (!_user) {
            common_1.Logger.error(`Couldn't find user with id = ${user.userId}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(user_business_error_1.UserBusinessErrors.NotFound);
        }
        if (user.userId != ticket.applicantId && user.role == role_enum_1.Role.USER) {
            common_1.Logger.error(`User(id:${user.userId}) aren't allowed to add messages to ticket(id:${id})`, '', 'TicketService', true);
            throw new common_1.UnauthorizedException(ticket_business_error_1.TicketBusinessErrors.UnauthorizedMessageCreate);
        }
        await this.messageModel.create({ text: messageDto.text, userId: user.userId, ticketId: ticket.id });
        return this.ticketModel.scope("one").findByPk(id);
    }
    findAll(page, elements) {
        if (page <= 0) {
            common_1.Logger.error(`Page must be more than 0`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        if (elements <= 0) {
            common_1.Logger.error(`Elements must be more than 0`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        return this.ticketModel.findAndCountAll({ limit: elements, offset: (page - 1) * elements });
    }
    async findOne(id, user) {
        const ticket = await this.ticketModel.scope("basic").findByPk(id);
        if (!ticket) {
            common_1.Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        if (user.userId != ticket.applicantId && user.role == role_enum_1.Role.USER) {
            common_1.Logger.error(`User(id:${user.userId}) aren't allowed to view tickets of other user`, '', 'TicketService', true);
            throw new common_1.UnauthorizedException(ticket_business_error_1.TicketBusinessErrors.UnauthorizedTicketAccess);
        }
        return this.ticketModel.scope("one").findByPk(id);
    }
    findByApplicantAndState(page, elements, id, user, state) {
        if (page <= 0) {
            common_1.Logger.error(`Page must be more than 0`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        if (elements <= 0) {
            common_1.Logger.error(`Elements must be more than 0`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        if (user.userId != id && user.role == role_enum_1.Role.USER) {
            common_1.Logger.error(`User(id:${user.userId}) aren't allowed to view tickets of other user`, '', 'TicketService', true);
            throw new common_1.UnauthorizedException(ticket_business_error_1.TicketBusinessErrors.UnauthorizedTicketAccess);
        }
        if (!Object.values(state_model_1.TicketState).includes(state)) {
            return this.ticketModel.findAndCountAll({ where: { applicantId: Number(id) }, limit: elements, offset: (page - 1) * elements, });
        }
        else {
            console.log(state);
            return this.ticketModel.findAndCountAll({ where: { applicantId: Number(id) }, include: { model: state_model_1.State, where: { state: state } }, limit: elements, offset: (page - 1) * elements, });
        }
    }
    findByWorkerAndState(page, elements, id, state) {
        if (page <= 0) {
            common_1.Logger.error(`Page must be more than 0`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        if (elements <= 0) {
            common_1.Logger.error(`Elements must be more than 0`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        let workerId = Number(id) <= 0 ? null : Number(id);
        if (!Object.values(state_model_1.TicketState).includes(state)) {
            return this.ticketModel.findAndCountAll({ where: { workerId: workerId }, limit: elements, offset: (page - 1) * elements, });
        }
        else {
            return this.ticketModel.findAndCountAll({ where: { workerId: workerId }, include: { model: state_model_1.State, where: { state: state } }, limit: elements, offset: (page - 1) * elements, });
        }
    }
    findByState(page, elements, state) {
        if (page <= 0) {
            common_1.Logger.error(`Page must be more than 0`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        if (elements <= 0) {
            common_1.Logger.error(`Elements must be more than 0`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        return this.ticketModel.findAndCountAll({ include: { model: state_model_1.State, where: { state: state } }, limit: elements, offset: (page - 1) * elements, });
    }
    async cancelTicket(id, user) {
        const ticket = await this.ticketModel.findByPk(id);
        if (!ticket) {
            common_1.Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        if (user.userId != ticket.applicantId) {
            common_1.Logger.error(`User aren't allowed to cancel ticket of other users`, '', 'TicketService', true);
            throw new common_1.NotAcceptableException(ticket_business_error_1.TicketBusinessErrors.UnauthorizedTicketCancel);
        }
        if (ticket.states[0].state == state_model_1.TicketState.CANCELED || ticket.states[0].state == state_model_1.TicketState.CLOSED || ticket.states[0].state == state_model_1.TicketState.COMPLETED) {
            throw new common_1.NotAcceptableException(ticket_business_error_1.TicketBusinessErrors.UnauthorizedTicketCancel);
        }
        const t = await this.sequelize.transaction();
        try {
            await this.stateModel.update({ active: false }, { where: { ticketId: id }, transaction: t });
            await this.stateModel.create({ state: state_model_1.TicketState.CANCELED, ticketId: id }, { transaction: t });
            const _ticket = await this.ticketModel.scope('one').findByPk(id, { transaction: t });
            t.commit();
            return _ticket;
        }
        catch (err) {
            t.rollback();
            throw err;
        }
    }
    async completeTicket(id) {
        const ticket = await this.ticketModel.findByPk(id);
        if (!ticket) {
            common_1.Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        if (ticket.states[0].state != state_model_1.TicketState.INWORK) {
            common_1.Logger.error(`Couldn't complete ticket with id = ${id}, as it is not in "IN WORK" status`, '', 'TicketService', true);
            throw new common_1.NotAcceptableException(ticket_business_error_1.TicketBusinessErrors.TicketCompletionFailure);
        }
        const t = await this.sequelize.transaction();
        try {
            await this.stateModel.update({ active: false }, { where: { ticketId: id }, transaction: t });
            await this.stateModel.create({ state: state_model_1.TicketState.WAITFORCONFRIMATION, ticketId: id }, { transaction: t });
            const _ticket = await this.ticketModel.scope('one').findByPk(id, { transaction: t });
            t.commit();
            return _ticket;
        }
        catch (err) {
            t.rollback();
            throw err;
        }
    }
    async confirmTicket(id, user) {
        const ticket = await this.ticketModel.findByPk(id);
        if (!ticket) {
            common_1.Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        if (ticket.states[0].state != state_model_1.TicketState.WAITFORCONFRIMATION) {
            common_1.Logger.error(`Couldn't confirm ticket with id = ${id}, as it is not in "WAIT FOR CONFIRMATION" status`, '', 'TicketService', true);
            throw new common_1.NotAcceptableException(ticket_business_error_1.TicketBusinessErrors.TicketCompletionFailure);
        }
        if (user.userId != ticket.applicantId) {
            common_1.Logger.error(`User aren't allowed to confirm ticket of other users`, '', 'TicketService', true);
            throw new common_1.NotAcceptableException(ticket_business_error_1.TicketBusinessErrors.UnauthorizedTicketConfirm);
        }
        const t = await this.sequelize.transaction();
        try {
            await this.stateModel.update({ active: false }, { where: { ticketId: id }, transaction: t });
            await this.stateModel.create({ state: state_model_1.TicketState.COMPLETED, ticketId: id }, { transaction: t });
            const _ticket = await this.ticketModel.scope('one').findByPk(id, { transaction: t });
            t.commit();
            return _ticket;
        }
        catch (err) {
            t.rollback();
            throw err;
        }
    }
    async closeTicket(id) {
        const ticket = await this.ticketModel.findByPk(id);
        if (!ticket) {
            common_1.Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        if (ticket.states[0].state == state_model_1.TicketState.CANCELED || ticket.states[0].state == state_model_1.TicketState.CLOSED || ticket.states[0].state == state_model_1.TicketState.COMPLETED) {
            throw new common_1.NotAcceptableException(ticket_business_error_1.TicketBusinessErrors.UnauthorizedTicketCancel);
        }
        const t = await this.sequelize.transaction();
        try {
            await this.stateModel.update({ active: false }, { where: { ticketId: id }, transaction: t });
            await this.stateModel.create({ state: state_model_1.TicketState.CLOSED, ticketId: id }, { transaction: t });
            const _ticket = await this.ticketModel.scope('one').findByPk(id, { transaction: t });
            t.commit();
            return _ticket;
        }
        catch (err) {
            t.rollback();
            throw err;
        }
    }
    async rejectTicket(id, user) {
        const ticket = await this.ticketModel.findByPk(id);
        if (!ticket) {
            common_1.Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        if (ticket.states[0].state != state_model_1.TicketState.WAITFORCONFRIMATION) {
            common_1.Logger.error(`Couldn't reject ticket with id = ${id}, as it is not in "WAIT FOR CONFIRMATION" status`, '', 'TicketService', true);
            throw new common_1.NotAcceptableException(ticket_business_error_1.TicketBusinessErrors.TicketRejectionFailure);
        }
        if (user.userId != ticket.applicantId) {
            common_1.Logger.error(`User aren't allowed to reject ticket of other users`, '', 'TicketService', true);
            throw new common_1.NotAcceptableException(ticket_business_error_1.TicketBusinessErrors.UnauthorizedTicketReject);
        }
        const t = await this.sequelize.transaction();
        try {
            await this.stateModel.update({ active: false }, { where: { ticketId: id }, transaction: t });
            await this.stateModel.create({ state: state_model_1.TicketState.INWORK, ticketId: id }, { transaction: t });
            const _ticket = await this.ticketModel.scope('one').findByPk(id, { transaction: t });
            t.commit();
            return _ticket;
        }
        catch (err) {
            t.rollback();
            throw err;
        }
    }
    async changeState(id, stateS) {
        const ticket = await this.ticketModel.findByPk(id);
        if (!ticket) {
            common_1.Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        if (!Object.values(state_model_1.TicketState).includes(stateS)) {
            throw new common_1.NotAcceptableException(ticket_business_error_1.TicketBusinessErrors.UnauthorizedTicketCancel);
        }
        if (ticket.states[0].state == stateS) {
            throw new common_1.NotAcceptableException(ticket_business_error_1.TicketBusinessErrors.UnauthorizedTicketCancel);
        }
        if (ticket.states[0].state == state_model_1.TicketState.CANCELED || ticket.states[0].state == state_model_1.TicketState.COMPLETED) {
            throw new common_1.NotAcceptableException(ticket_business_error_1.TicketBusinessErrors.UnauthorizedTicketCancel);
        }
        const t = await this.sequelize.transaction();
        try {
            if (ticket.states[0].state == state_model_1.TicketState.CLOSED) {
                await this.stateModel.destroy({ where: { ticketId: id, isActive: true } });
                const state = await this.stateModel.findOne({ where: { ticketId: id }, order: ["createdAt"] });
                if (state.state != stateS) {
                    await this.stateModel.create({ state: stateS, ticketId: id }, { transaction: t });
                }
                else {
                    await state.update({ isActive: true });
                }
            }
            else {
                await this.stateModel.update({ active: false }, { where: { ticketId: id }, transaction: t });
                await this.stateModel.create({ state: stateS, ticketId: id }, { transaction: t });
            }
            const _ticket = await this.ticketModel.scope('one').findByPk(id, { transaction: t });
            t.commit();
            return _ticket;
        }
        catch (err) {
            t.rollback();
            throw err;
        }
    }
    async changeCategory(id, categoryId) {
        const ticket = await this.ticketModel.scope("basic").findByPk(id);
        if (!ticket) {
            common_1.Logger.error(`Couldn't find ticket with id = ${id}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        const category = await this.categoryModel.findByPk(categoryId);
        if (!category) {
            throw new common_1.NotAcceptableException(ticket_business_error_1.TicketBusinessErrors.UnauthorizedTicketCancel);
        }
        ticket.update({ categoryId: categoryId });
        return this.ticketModel.scope('one').findByPk(id);
    }
    async assignWorker(ticketId, workerId, user) {
        const ticket = await this.ticketModel.scope("basic").findByPk(ticketId);
        if (!ticket) {
            common_1.Logger.error(`Couldn't find ticket with id = ${ticketId}`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.NotFound);
        }
        if (user.userId != workerId && user.role == role_enum_1.Role.TECHSUPPORT) {
            common_1.Logger.error(`User(id:${user.userId}) aren't allowed to assign tickets to other users`, '', 'TicketService', true);
            throw new common_1.UnauthorizedException(ticket_business_error_1.TicketBusinessErrors.UnauthorizedTicketAccess);
        }
        if (ticket.workerId != null && user.role == role_enum_1.Role.TECHSUPPORT) {
            common_1.Logger.error(`User(id:${user.userId}) aren't allowed to change ticket worker`, '', 'TicketService', true);
            throw new common_1.UnauthorizedException(ticket_business_error_1.TicketBusinessErrors.TicketAlreadyInWork);
        }
        const _user = await this.userModel.findByPk(workerId);
        if (!_user) {
            workerId = null;
        }
        if (workerId != null && _user.role != role_enum_1.Role.TECHSUPPORT) {
            common_1.Logger.error(`Users with role ${_user.role} aren't allow for worker position`, '', 'TicketService', true);
            throw new common_1.NotFoundException(ticket_business_error_1.TicketBusinessErrors.InvalidUser);
        }
        await ticket.update({ workerId: workerId });
        return await this.ticketModel.scope("one").findByPk(ticketId);
    }
};
TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.TICKET_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.MESSAGE_REPOSITORY)),
    __param(2, (0, common_1.Inject)(constants_1.CATEGORY_REPOSITORY)),
    __param(3, (0, common_1.Inject)(constants_1.USER_REPOSITORY)),
    __param(4, (0, common_1.Inject)(constants_1.STATE_REPOSITORY)),
    __param(5, (0, common_1.Inject)(constants_1.SEQUELIZE)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, sequelize_typescript_1.Sequelize])
], TicketService);
exports.TicketService = TicketService;
//# sourceMappingURL=ticket.service.js.map