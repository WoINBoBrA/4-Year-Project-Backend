"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageProviders = void 0;
const constants_1 = require("../../core/constants");
const message_model_1 = require("./message.model");
exports.messageProviders = [{
        provide: constants_1.MESSAGE_REPOSITORY,
        useValue: message_model_1.Message,
    }];
//# sourceMappingURL=message.providers.js.map