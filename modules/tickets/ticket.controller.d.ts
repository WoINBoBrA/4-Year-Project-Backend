import { TicketDto } from './ticket.dto';
import { TicketService } from './ticket.service';
import { MessageDto } from 'src/modules/messages/message.dto';
import { TicketState } from './states/state.model';
export declare class TicketController {
    private readonly ticketService;
    constructor(ticketService: TicketService);
    findAll(page: number, elements: number): Promise<{
        rows: import("./ticket.model").Ticket[];
        count: number;
    }>;
    findOne(id: string, req: any): Promise<import("./ticket.model").Ticket>;
    findByApplicantAndState(page: number, elements: number, id: string, state: TicketState, req: any): Promise<{
        rows: import("./ticket.model").Ticket[];
        count: number;
    }>;
    findByWorker(page: number, elements: number, id: string, state: TicketState): Promise<{
        rows: import("./ticket.model").Ticket[];
        count: number;
    }>;
    findByState(state: TicketState, page: number, elements: number): Promise<{
        rows: import("./ticket.model").Ticket[];
        count: number;
    }>;
    create(ticketDto: TicketDto, messageDto: MessageDto, req: any): Promise<import("./ticket.model").Ticket>;
    createMessage(id: string, messageDto: MessageDto, req: any): Promise<import("./ticket.model").Ticket>;
    cancelTicket(id: string, req: any): Promise<import("./ticket.model").Ticket>;
    confirmTicket(id: string, req: any): Promise<import("./ticket.model").Ticket>;
    rejectTicket(id: string, req: any): Promise<import("./ticket.model").Ticket>;
    closeTicket(id: string): Promise<import("./ticket.model").Ticket>;
    completeTicket(id: string): Promise<import("./ticket.model").Ticket>;
    changeState(id: string, state: TicketState): Promise<import("./ticket.model").Ticket>;
    assignTicket(ticketId: string, userId: string, req: any): Promise<import("./ticket.model").Ticket>;
    changeCategory(id: string, categoryId: string): Promise<import("./ticket.model").Ticket>;
}
