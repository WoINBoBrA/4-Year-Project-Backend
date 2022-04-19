import { UserDto } from 'src/users/user.dto';
import { User } from './users.model';
export declare class UsersService {
    private usersModel;
    constructor(usersModel: typeof User);
    findAll(): Promise<User[]>;
    create(userDto: UserDto): Promise<User>;
    findOne(id: string): Promise<User>;
    findByLogin(login: string): Promise<User>;
    changePassword(id: string, newPassword: string): Promise<User>;
    activate(id: string): Promise<User>;
    disable(id: string): Promise<User>;
}
