import { State } from './modules/tickets/states/state.model';
import { Ticket } from './modules/tickets/ticket.model';
export declare class AppService {
    private readonly stateModel;
    private readonly ticketModel;
    private readonly momentWrapper;
    constructor(stateModel: typeof State, ticketModel: typeof Ticket, momentWrapper: moment.Moment);
    WeekStatistics(): Promise<[Ticket[], State[], State[]]>;
    YearStatistics(): Promise<[Ticket[], State[], State[]]>;
}
