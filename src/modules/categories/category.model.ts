import { Model, Column, HasMany, Table, AllowNull, DefaultScope } from 'sequelize-typescript';
import { Ticket } from '../tickets/ticket.model';
@DefaultScope(() => ({
  attributes: ["id","name"],
  order:[["createdAt","DESC"]]
}))
@Table
export class Category extends Model {

  
  @AllowNull(false)
  @Column
  name: string;

  @HasMany(() => Ticket)
  tickets: Ticket[];
}