import { Model } from 'sequelize-typescript';
import { Category } from '../categories/category.entity';
import { Message } from '../messages/message.entity';
import { User } from '../users/users.model';
export declare enum TicketState {
    CLOSED = "\u0417\u0430\u044F\u0432\u043A\u0430 \u0437\u0430\u043A\u0440\u044B\u0442\u0430",
    CANCELED = "\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043E\u0437\u0432\u0430\u043D\u0430",
    INWORK = "\u0417\u0430\u044F\u0432\u043A\u0430 \u0432 \u0440\u0430\u0431\u043E\u0442\u0435",
    WAITFORCONFRIMATION = "\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0436\u0438\u0434\u0430\u0435\u0442 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F",
    COMPLETED = "\u0417\u0430\u044F\u0432\u043A\u0430 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430"
}
export declare class Ticket extends Model {
    theme: string;
    categoryId: number;
    category: Category;
    state: TicketState;
    messages: Message[];
    applicantId: number;
    workerId: number;
    applicant: User;
    worker: User;
}
