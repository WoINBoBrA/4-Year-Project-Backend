import { Sequelize } from 'sequelize-typescript';
import { Category } from 'src/modules/categories/category.model';
import { Message } from 'src/modules/messages/message.model';
import { State } from 'src/modules/tickets/states/state.model';
import { Ticket } from 'src/modules/tickets/ticket.model';
import { User } from 'src/modules/users/users.model';
import { UsersService } from 'src/modules/users/users.service';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseConfig.development;
           break;
        case TEST:
           config = databaseConfig.test;
           break;
        case PRODUCTION:
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User,Ticket,Message,Category,State]);
        await sequelize.sync();
        return sequelize;
    },
}];