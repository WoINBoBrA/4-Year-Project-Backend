import { Model } from 'sequelize-typescript';
import { Category } from '../categories/category.model';
import { Message } from '../messages/message.model';
import { User } from '../users/users.model';
import { State } from './states/state.model';
export declare class Ticket extends Model {
    theme: string;
    categoryId: number;
    category: Category;
    messages: Message[];
    states: State;
    applicantId: number;
    workerId: number;
    applicant: User;
    worker: User;
}
