"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ticketProviders = void 0;
const constants_1 = require("../../core/constants");
const ticket_model_1 = require("./ticket.model");
exports.ticketProviders = [{
        provide: constants_1.TICKET_REPOSITORY,
        useValue: ticket_model_1.Ticket,
    }];
//# sourceMappingURL=ticket.providers.js.map