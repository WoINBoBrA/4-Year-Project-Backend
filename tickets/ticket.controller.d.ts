import { TicketState } from './ticket.model';
import { TicketDto } from './ticket.dto';
import { TicketService } from './ticket.service';
import { MessageDto } from 'src/messages/message.dto';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    findAll(): Promise<import("./ticket.model").Ticket[]>;
    findByApplicant(id: string, req: any): Promise<import("./ticket.model").Ticket[]>;
    findByWorker(id: string, req: any): Promise<import("./ticket.model").Ticket[]>;
    findByState(state: TicketState): Promise<import("./ticket.model").Ticket[]>;
    create(ticketDto: TicketDto, messageDto: MessageDto, req: any): Promise<import("./ticket.model").Ticket>;
    createMessage(id: string, messageDto: MessageDto, req: any): Promise<import("./ticket.model").Ticket>;
    cancelTicket(id: string, req: any): Promise<import("./ticket.model").Ticket>;
    confirmTicket(id: string, req: any): Promise<import("./ticket.model").Ticket>;
    rejectTicket(id: string, req: any): Promise<import("./ticket.model").Ticket>;
    closeTicket(id: string): Promise<import("./ticket.model").Ticket>;
    completeTicket(id: string): Promise<import("./ticket.model").Ticket>;
    findOne(id: string): Promise<import("./ticket.model").Ticket>;
}
