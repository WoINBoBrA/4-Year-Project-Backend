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
const ticket_model_1 = require("./ticket.model");
const ticket_dto_1 = require("./ticket.dto");
const ticket_service_1 = require("./ticket.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const role_decorator_1 = require("../roles/role.decorator");
const role_enum_1 = require("../roles/role.enum");
const message_dto_1 = require("../messages/message.dto");
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    findAll() {
        return this.ticketService.findAll();
    }
    findByApplicant(id, req) {
        return this.ticketService.findByApplicant(id, req.user);
    }
    findByWorker(id, req) {
        return this.ticketService.findByWorker(id, req.user);
    }
    findByState(state) {
        return this.ticketService.findByState(state);
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
    findOne(id) {
        return this.ticketService.findOne(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('applicant:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "findByApplicant", null);
__decorate([
    (0, common_1.Get)('worker:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "findByWorker", null);
__decorate([
    (0, common_1.Post)('state'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
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
    (0, common_1.Post)('message:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER, role_enum_1.Role.TECHSUPPORT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('message')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, message_dto_1.MessageDto, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Patch)('cancel:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "cancelTicket", null);
__decorate([
    (0, common_1.Patch)('confirm:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "confirmTicket", null);
__decorate([
    (0, common_1.Post)('reject:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "rejectTicket", null);
__decorate([
    (0, common_1.Post)('close:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "closeTicket", null);
__decorate([
    (0, common_1.Post)('complete:id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "completeTicket", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.USER, role_enum_1.Role.TECHSUPPORT, role_enum_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "findOne", null);
TicketController = __decorate([
    (0, common_1.Controller)('tickets'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketController);
exports.TicketController = TicketController;
//# sourceMappingURL=ticket.controller.js.map