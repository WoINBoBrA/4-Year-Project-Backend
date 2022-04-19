import { Model, BelongsTo, Column, Default, HasMany, Table, ForeignKey, AllowNull, DefaultScope, Scopes, Sequelize } from 'sequelize-typescript';
import { Category } from '../categories/category.model';
import { Message } from '../messages/message.model';
import { User } from '../users/users.model';
import { State } from './states/state.model';

@DefaultScope(() => ({
  attributes: ["id","theme","categoryId","workerId","applicantId","createdAt"], 
  include: [
    {
      model: Category,
      attributes: ["name"]

    },
    {
      model: State,
      required: true,
      where: {active: true}
    },
    {
      model: User, 
      as: "applicant", 
      attributes: ["firstName","secondName"]
    },
    {
      model: User, 
      as: "worker", 
      attributes: ["firstName","secondName"]
    }
  ],
  order:[["createdAt","DESC"]]
}))
@Scopes(() => ({
  one: {
    attributes: ["id","theme","categoryId","workerId","applicantId","createdAt"], 
    include: [
      {
        model: Category,
        attributes: ["name"]
      },
      {
        model: State,
        required: true,
        where: {active: true}
      },
      {
        model: User, 
        as: "applicant", 
        attributes: ["firstName","secondName"]
      },
      {
        model: User, 
        as: "worker", 
        attributes: ["firstName","secondName"]
      },
      {
        model: Message,
      }
    ],
    order:[["createdAt","DESC"]]
  },
  basic: {
    attributes: ["id","theme","categoryId","applicantId","workerId","createdAt"]
  }
}))
@Table
export class Ticket extends Model {

  @AllowNull(false)
  @Column
  theme: string;

  @ForeignKey(() => Category)
  @AllowNull(false)
  @Column
  categoryId: number

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Message)
  messages: Message[];

  @HasMany(() => State)
  states: State

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column
  applicantId: number

  @ForeignKey(() => User)
  @Column
  workerId: number

  @BelongsTo(() => User,{ foreignKey:"applicantId", as: "applicant"})
  applicant: User;

  @BelongsTo(()=> User,{ foreignKey:"workerId", as: "worker"})
  worker: User;

}