import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { MOMENT_WRAPPER, STATE_REPOSITORY, TICKET_REPOSITORY } from './core/constants';
import { State, TicketState } from './modules/tickets/states/state.model';
import { Op } from "sequelize";
import { Ticket } from './modules/tickets/ticket.model';

@Injectable()
export class AppService {

  constructor(@Inject(STATE_REPOSITORY) private readonly stateModel: typeof State,
              @Inject(TICKET_REPOSITORY) private readonly ticketModel: typeof Ticket,
              @Inject(MOMENT_WRAPPER) private readonly momentWrapper: moment.Moment){
  }

  async WeekStatistics() : Promise<[Ticket[],State[],State[]]> {

    const received = await this.ticketModel.scope('basic').findAll({
      attributes: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'),  '%d.%m.%Y'),"date"], [Sequelize.literal("COUNT(DISTINCT id)"),"ticketCount"]],
      group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'),  '%d.%m.%Y')],
    })

    const completed = await this.stateModel.findAll({
      attributes: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'),  '%d.%m.%Y'),"date"], [Sequelize.literal("COUNT(DISTINCT ticketId)"),"ticketCount"]],
      where: {
        state:TicketState.COMPLETED,
      },
      group: ['state', Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'),  '%d.%m.%Y')],
    });

    const closed = await this.stateModel.findAll({
      attributes: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'),  '%d.%m.%Y'),"date"], [Sequelize.literal("COUNT(DISTINCT ticketId)"),"ticketCount"]],
      where: {
        [Op.or]:[
          {state:TicketState.CLOSED},
          {state:TicketState.CANCELED},
        ]

      },
      group: ['state', Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'),  '%d.%m.%Y')],
    });

    return [received, completed, closed];

  }

  async YearStatistics() : Promise<[Ticket[],State[],State[]]> {

    const received = await this.ticketModel.scope('basic').findAll({
      attributes: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'),  '%m.%Y'),"month"], [Sequelize.literal("COUNT(DISTINCT id)"),"ticketCount"]],
      group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'),  '%m.%Y')],
    })

    const completed = await this.stateModel.findAll({
      attributes: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'),  '%m.%Y'),"month"], [Sequelize.literal("COUNT(DISTINCT ticketId)"),"ticketCount"]],
      where: {
        state:TicketState.COMPLETED,
      },
      group: ['state', Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'),  '%m.%Y')],
    });

    const closed = await this.stateModel.findAll({
      attributes: [[Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'),  '%m.%Y'),"month"], [Sequelize.literal("COUNT(DISTINCT ticketId)"),"ticketCount"]],
      where: {
        [Op.or]:[
          {state:TicketState.CLOSED},
          {state:TicketState.CANCELED},
        ]

      },
      group: ['state', Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'),  '%m.%Y')],
    });

    return [received, completed, closed];

    
  }



}
