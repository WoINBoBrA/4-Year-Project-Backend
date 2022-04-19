"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const category_model_1 = require("../../modules/categories/category.model");
const message_model_1 = require("../../modules/messages/message.model");
const state_model_1 = require("../../modules/tickets/states/state.model");
const ticket_model_1 = require("../../modules/tickets/ticket.model");
const users_model_1 = require("../../modules/users/users.model");
const constants_1 = require("../constants");
const database_config_1 = require("./database.config");
exports.databaseProviders = [{
        provide: constants_1.SEQUELIZE,
        useFactory: async () => {
            let config;
            switch (process.env.NODE_ENV) {
                case constants_1.DEVELOPMENT:
                    config = database_config_1.databaseConfig.development;
                    break;
                case constants_1.TEST:
                    config = database_config_1.databaseConfig.test;
                    break;
                case constants_1.PRODUCTION:
                    config = database_config_1.databaseConfig.production;
                    break;
                default:
                    config = database_config_1.databaseConfig.development;
            }
            const sequelize = new sequelize_typescript_1.Sequelize(config);
            sequelize.addModels([users_model_1.User, ticket_model_1.Ticket, message_model_1.Message, category_model_1.Category, state_model_1.State]);
            await sequelize.sync();
            return sequelize;
        },
    }];
//# sourceMappingURL=database.providers.js.map