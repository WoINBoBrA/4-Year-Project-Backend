import { TICKET_REPOSITORY } from "src/core/constants";
import { Ticket } from "./ticket.model";

export const ticketProviders = [{
  provide: TICKET_REPOSITORY,
  useValue: Ticket,
}];