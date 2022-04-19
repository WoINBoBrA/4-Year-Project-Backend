
import { Model, AllowNull, Column, Default, HasMany, Table, Unique, DefaultScope, Scopes } from 'sequelize-typescript';
import { Message } from '../messages/message.model';
import { Ticket } from '../tickets/ticket.model';
import { Role } from '../../roles/role.enum';



@DefaultScope(() => ({
  attributes: ['id', 'login', 'firstName', 'secondName', 'role', 'isActive','createdAt'],
  order:[["createdAt","DESC"]]
}))
@Scopes(() => ({
  login: {
    attributes: ['id', 'login', 'password', 'firstName', 'secondName', 'role', 'isActive','createdAt'],
  },
  name: {
    attributes: ['firstName','secondName'],
  }
}))
@Table
export class User extends Model {



  @AllowNull(false)
  @Unique(true)
  @Column
  login: string;

  @AllowNull(false)
  @Column
  password: string;


  @AllowNull(false)
  @Column
  firstName: string;
  

  @AllowNull(false)
  @Column
  secondName: string;


  @AllowNull(false)
  @Default(Role.USER)
  @Column
  role: Role


  @AllowNull(false)
  @Default(true)
  @Column
  isActive: boolean;

  @HasMany(() => Message)
  messages: Message[];

  @HasMany(() => Ticket, { foreignKey:"applicantId", as: "Applicant"})
  tickets: Ticket[];

  @HasMany(() => Ticket, { foreignKey:"workerId", as: "Worker"})
  tasks: Ticket[];



}