import { Model } from 'sequelize-typescript';
import { Ticket } from '../tickets/ticket.model';
import { User } from '../users/users.model';
export declare class Message extends Model {
    text: string;
    userId: number;
    ticketId: number;
    user: User;
    ticket: Ticket;
}
