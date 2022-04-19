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
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const ticket_dto_1 = require("./ticket.dto");
const ticket_service_1 = require("./ticket.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const role_decorator_1 = require("../../roles/role.decorator");
const role_enum_1 = require("../../roles/role.enum");
const message_dto_1 = require("../messages/message.dto");
const roles_guard_1 = require("../../roles/roles.guard");
const state_model_1 = require("./states/state.model");
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    findAll(page, elements) {
        return this.ticketService.findAll(page, elements);
    }
    findOne(id, req) {
        return this.ticketService.findOne(id, req.user);
    }
    findByApplicantAndState(page, elements, id, state, req) {
        return this.ticketService.findByApplicantAndState(page, elements, id, state, req.user);
    }
    findByWorker(page, elements, id, state) {
        return this.ticketService.findByWorkerAndState(page, elements, id, state);
    }
    findByState(state, page, elements) {
        return this.ticketService.findByState(page, elements, state);
    }
    create(ticketDto, messageDto, req) {
        return this.ticketService.create(ticketDto, messageDto, req.user);
    }
    createMessage(id, messageDto, req) {
        return this.ticketService.createMessage(id, messageDto, req.user);
    }
    cancelTicket(id, req) {
        return this.ticketService.cancelTicket(id, req.user);
    }
    confirmTicket(id, req) {
        return this.ticketService.confirmTicket(id, req.user);
    }
    rejectTicket(id, req) {
        return this.ticketService.rejectTicket(id, req.user);
    }
    closeTicket(id) {
        return this.ticketService.closeTicket(id);
    }
    completeTicket(id) {
        return this.ticketService.completeTicket(id);
    }
    changeState(id, state) {
        return this.ticketService.changeState(id, state);
    }
    assignTicket(ticketId, userId, req) {
        return this.ticketService.assignWorker(ticketId, userId, req.user);
    }
    changeCategory(id, categoryId) {
        return this.ticketService.changeCategory(id, categoryId);
    }
};
__decorate([
    (0, common_1.Get)('config/page:page/elements:elements'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('elements')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER, role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('applicant:id/state:state/config/page:page/elements:elements'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('elements')),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Param)("state")),
    __param(4, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "findByApplicantAndState", null);
__decorate([
    (0, common_1.Get)('worker:id/state:state/config/page:page/elements:elements'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('page')),
    __param(1, (0, common_1.Param)('elements')),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Param)("state")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "findByWorker", null);
__decorate([
    (0, common_1.Get)('state:state/config/page:page/elements:elements'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)("state")),
    __param(1, (0, common_1.Param)('page')),
    __param(2, (0, common_1.Param)('elements')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "findByState", null);
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER),
    __param(0, (0, common_1.Body)('ticket')),
    __param(1, (0, common_1.Body)('message')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_dto_1.TicketDto, message_dto_1.MessageDto, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('message/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER, role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, message_dto_1.MessageDto, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Patch)('cancel/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "cancelTicket", null);
__decorate([
    (0, common_1.Patch)('confirm/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "confirmTicket", null);
__decorate([
    (0, common_1.Patch)('reject/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "rejectTicket", null);
__decorate([
    (0, common_1.Patch)('close/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "closeTicket", null);
__decorate([
    (0, common_1.Patch)('complete/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "completeTicket", null);
__decorate([
    (0, common_1.Patch)(':id/state:state'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "changeState", null);
__decorate([
    (0, common_1.Patch)('assign/:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)("userId")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "assignTicket", null);
__decorate([
    (0, common_1.Patch)(':id/category:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)("category")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "changeCategory", null);
TicketController = __decorate([
    (0, common_1.Controller)('tickets'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketController);
exports.TicketController = TicketController;
//# sourceMappingURL=ticket.controller.js.map