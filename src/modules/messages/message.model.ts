import { Model, BelongsTo, Column, ForeignKey, Table, AllowNull, DefaultScope, Scopes } from 'sequelize-typescript';
import { Ticket } from '../tickets/ticket.model';
import { User } from '../users/users.model';

@DefaultScope(() => ({
  attributes: ["id","text","createdAt","userId","ticketId"], 
  include: [
    {
      model: User, 
      attributes: ["firstName","secondName"]
    },
  ],
  order:[["createdAt","DESC"]]
}))
@Table
export class Message extends Model {


  @AllowNull(false)
  @Column
  text: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  userId: number
  
  @ForeignKey(() => Ticket)
  @AllowNull(false)
  @Column
  ticketId: number

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Ticket)
  ticket: Ticket;
}