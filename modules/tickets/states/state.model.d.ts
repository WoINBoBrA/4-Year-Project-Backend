import { Model } from 'sequelize-typescript';
import { Ticket } from '../ticket.model';
export declare enum TicketState {
    CLOSED = 0,
    INWORK = 1,
    WAITFORCONFRIMATION = 2,
    COMPLETED = 3,
    CANCELED = 4
}
export declare class State extends Model {
    state: TicketState;
    active: boolean;
    ticketId: number;
    ticket: Ticket;
}
