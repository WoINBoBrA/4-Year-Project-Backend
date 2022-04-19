import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesGuard } from './roles/roles.guard';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TicketModule } from './modules/tickets/ticket.module';
import { CategoryModule } from './modules/categories/category.module';
import { User } from './modules/users/users.model';
import { Ticket } from './modules/tickets/ticket.model';
import { Message } from './modules/messages/message.model';
import { Category } from './modules/categories/category.model';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as moment from 'moment-timezone';
import { MOMENT_WRAPPER} from './core/constants';
import { stateProviders } from './modules/tickets/states/state.providers';
import { ticketProviders } from './modules/tickets/ticket.providers';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule, AuthModule, UsersModule, TicketModule, CategoryModule, DatabaseModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: MOMENT_WRAPPER,
      useValue: moment
    },
    ...stateProviders,
    ...ticketProviders,
  ]
})
export class AppModule {}
