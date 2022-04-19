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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_typescript_1 = require("sequelize-typescript");
const constants_1 = require("./core/constants");
const state_model_1 = require("./modules/tickets/states/state.model");
const sequelize_1 = require("sequelize");
let AppService = class AppService {
    constructor(stateModel, ticketModel, momentWrapper) {
        this.stateModel = stateModel;
        this.ticketModel = ticketModel;
        this.momentWrapper = momentWrapper;
    }
    async WeekStatistics() {
        const received = await this.ticketModel.scope('basic').findAll({
            attributes: [[sequelize_typescript_1.Sequelize.fn('DATE_FORMAT', sequelize_typescript_1.Sequelize.col('createdAt'), '%d.%m.%Y'), "date"], [sequelize_typescript_1.Sequelize.literal("COUNT(DISTINCT id)"), "ticketCount"]],
            group: [sequelize_typescript_1.Sequelize.fn('DATE_FORMAT', sequelize_typescript_1.Sequelize.col('createdAt'), '%d.%m.%Y')],
        });
        const completed = await this.stateModel.findAll({
            attributes: [[sequelize_typescript_1.Sequelize.fn('DATE_FORMAT', sequelize_typescript_1.Sequelize.col('createdAt'), '%d.%m.%Y'), "date"], [sequelize_typescript_1.Sequelize.literal("COUNT(DISTINCT ticketId)"), "ticketCount"]],
            where: {
                state: state_model_1.TicketState.COMPLETED,
            },
            group: ['state', sequelize_typescript_1.Sequelize.fn('DATE_FORMAT', sequelize_typescript_1.Sequelize.col('createdAt'), '%d.%m.%Y')],
        });
        const closed = await this.stateModel.findAll({
            attributes: [[sequelize_typescript_1.Sequelize.fn('DATE_FORMAT', sequelize_typescript_1.Sequelize.col('createdAt'), '%d.%m.%Y'), "date"], [sequelize_typescript_1.Sequelize.literal("COUNT(DISTINCT ticketId)"), "ticketCount"]],
            where: {
                [sequelize_1.Op.or]: [
                    { state: state_model_1.TicketState.CLOSED },
                    { state: state_model_1.TicketState.CANCELED },
                ]
            },
            group: ['state', sequelize_typescript_1.Sequelize.fn('DATE_FORMAT', sequelize_typescript_1.Sequelize.col('createdAt'), '%d.%m.%Y')],
        });
        return [received, completed, closed];
    }
    async YearStatistics() {
        const received = await this.ticketModel.scope('basic').findAll({
            attributes: [[sequelize_typescript_1.Sequelize.fn('DATE_FORMAT', sequelize_typescript_1.Sequelize.col('createdAt'), '%m.%Y'), "month"], [sequelize_typescript_1.Sequelize.literal("COUNT(DISTINCT id)"), "ticketCount"]],
            group: [sequelize_typescript_1.Sequelize.fn('DATE_FORMAT', sequelize_typescript_1.Sequelize.col('createdAt'), '%m.%Y')],
        });
        const completed = await this.stateModel.findAll({
            attributes: [[sequelize_typescript_1.Sequelize.fn('DATE_FORMAT', sequelize_typescript_1.Sequelize.col('createdAt'), '%m.%Y'), "month"], [sequelize_typescript_1.Sequelize.literal("COUNT(DISTINCT ticketId)"), "ticketCount"]],
            where: {
                state: state_model_1.TicketState.COMPLETED,
            },
            group: ['state', sequelize_typescript_1.Sequelize.fn('DATE_FORMAT', sequelize_typescript_1.Sequelize.col('createdAt'), '%m.%Y')],
        });
        const closed = await this.stateModel.findAll({
            attributes: [[sequelize_typescript_1.Sequelize.fn('DATE_FORMAT', sequelize_typescript_1.Sequelize.col('createdAt'), '%m.%Y'), "month"], [sequelize_typescript_1.Sequelize.literal("COUNT(DISTINCT ticketId)"), "ticketCount"]],
            where: {
                [sequelize_1.Op.or]: [
                    { state: state_model_1.TicketState.CLOSED },
                    { state: state_model_1.TicketState.CANCELED },
                ]
            },
            group: ['state', sequelize_typescript_1.Sequelize.fn('DATE_FORMAT', sequelize_typescript_1.Sequelize.col('createdAt'), '%m.%Y')],
        });
        return [received, completed, closed];
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(constants_1.STATE_REPOSITORY)),
    __param(1, (0, common_1.Inject)(constants_1.TICKET_REPOSITORY)),
    __param(2, (0, common_1.Inject)(constants_1.MOMENT_WRAPPER)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map