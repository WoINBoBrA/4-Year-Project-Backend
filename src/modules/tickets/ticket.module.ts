import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { databaseProviders } from 'src/core/database/database.providers';
import { categoryProviders } from '../categories/category.providers';
import { messageProviders } from '../messages/message.providers';
import { userProviders } from '../users/user.providers';
import { stateProviders } from './states/state.providers';
import { TicketController } from './ticket.controller';
import { ticketProviders } from './ticket.providers';
import { TicketService } from './ticket.service';

@Module({
  imports: [DatabaseModule],
  providers: [TicketService, ...ticketProviders, ...messageProviders, ...userProviders, ...categoryProviders, ...stateProviders],
  exports: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}