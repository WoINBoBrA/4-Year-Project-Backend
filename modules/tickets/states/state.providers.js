"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateProviders = void 0;
const constants_1 = require("../../../core/constants");
const state_model_1 = require("./state.model");
exports.stateProviders = [{
        provide: constants_1.STATE_REPOSITORY,
        useValue: state_model_1.State,
    }];
//# sourceMappingURL=state.providers.js.map