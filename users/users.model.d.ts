import { Model } from 'sequelize-typescript';
import { Message } from '../messages/message.entity';
import { Ticket } from '../tickets/ticket.model';
import { Role } from '../roles/role.enum';
export declare class User extends Model {
    login: string;
    password: string;
    firstName: string;
    secondName: string;
    role: Role;
    isActive: boolean;
    messages: Message[];
    tickets: Ticket[];
    tasks: Ticket[];
}
