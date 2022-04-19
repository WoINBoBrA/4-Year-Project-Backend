import { Ticket } from './ticket.model';
import { MessageDto } from '../messages/message.dto';
import { TicketDto } from './ticket.dto';
import { Category } from '../categories/category.model';
import { User } from '../users/users.model';
import { Message } from '../messages/message.model';
import { State, TicketState } from './states/state.model';
import { Sequelize } from 'sequelize-typescript';
export declare class TicketService {
    private readonly ticketModel;
    private readonly messageModel;
    private readonly categoryModel;
    private readonly userModel;
    private readonly stateModel;
    private readonly sequelize;
    constructor(ticketModel: typeof Ticket, messageModel: typeof Message, categoryModel: typeof Category, userModel: typeof User, stateModel: typeof State, sequelize: Sequelize);
    create(ticketDto: TicketDto, messageDto: MessageDto, user: any): Promise<Ticket>;
    createMessage(id: string, messageDto: MessageDto, user: any): Promise<Ticket>;
    findAll(page: number, elements: number): Promise<{
        rows: Ticket[];
        count: number;
    }>;
    findOne(id: string, user: any): Promise<Ticket>;
    findByApplicantAndState(page: number, elements: number, id: string, user: any, state?: TicketState): Promise<{
        rows: Ticket[];
        count: number;
    }>;
    findByWorkerAndState(page: number, elements: number, id: string, state: TicketState): Promise<{
        rows: Ticket[];
        count: number;
    }>;
    findByState(page: number, elements: number, state: TicketState): Promise<{
        rows: Ticket[];
        count: number;
    }>;
    cancelTicket(id: string, user: any): Promise<Ticket>;
    completeTicket(id: string): Promise<Ticket>;
    confirmTicket(id: string, user: any): Promise<Ticket>;
    closeTicket(id: string): Promise<Ticket>;
    rejectTicket(id: string, user: any): Promise<Ticket>;
    changeState(id: string, stateS: TicketState): Promise<Ticket>;
    changeCategory(id: string, categoryId: string): Promise<Ticket>;
    assignWorker(ticketId: string, workerId: string, user: any): Promise<Ticket>;
}
