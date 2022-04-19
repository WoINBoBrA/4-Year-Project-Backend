import { TicketState } from "./ticket.model";
export declare class TicketDto {
    readonly theme: string;
    readonly categoryId: number;
    readonly state: TicketState;
    readonly applicantId: number;
    readonly workerId?: number;
}
