import { Model } from 'sequelize-typescript';
import { Ticket } from '../tickets/ticket.model';
export declare class Category extends Model {
    name: string;
    tickets: Ticket[];
}
