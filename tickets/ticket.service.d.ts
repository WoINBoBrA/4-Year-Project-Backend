import { Ticket, TicketState } from './ticket.model';
import { MessageDto } from '../messages/message.dto';
import { TicketDto } from './ticket.dto';
export declare class TicketService {
    private ticketModel;
    constructor(ticketModel: typeof Ticket);
    findAll(): Promise<Ticket[]>;
    create(ticketDto: TicketDto, messageDto: MessageDto, user: any): Promise<Ticket>;
    createMessage(id: string, messageDto: MessageDto, user: any): Promise<Ticket>;
    findOne(id: string): Promise<Ticket>;
    findByApplicant(id: string, user: any): Promise<Ticket[]>;
    findByWorker(id: string, user: any): Promise<Ticket[]>;
    findByState(state: TicketState): Promise<Ticket[]>;
    cancelTicket(id: string, user: any): Promise<Ticket>;
    completeTicket(id: string): Promise<Ticket>;
    confirmTicket(id: string, user: any): Promise<Ticket>;
    closeTicket(id: string): Promise<Ticket>;
    rejectTicket(id: string, user: any): Promise<Ticket>;
}
