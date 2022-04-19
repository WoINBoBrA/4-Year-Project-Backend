import { Model, BelongsTo, Column, Default, HasMany, Table, ForeignKey, AllowNull, DefaultScope, Scopes } from 'sequelize-typescript';
import { Ticket } from '../ticket.model';

export enum TicketState {
    CLOSED = 0,
    INWORK = 1,
    WAITFORCONFRIMATION = 2,
    COMPLETED = 3,
    CANCELED = 4,
}

@DefaultScope(() => ({
  attributes: ["state","createdAt","ticketId"]
}))
@Table
export class State extends Model {

  @AllowNull(false)
  @Column
  state: TicketState;

  @Default(true)
  @AllowNull(false)
  @Column
  active: boolean;

  @ForeignKey(() => Ticket)
  @AllowNull(false)
  @Column
  ticketId: number

  @BelongsTo(() => Ticket)
  ticket: Ticket;

}