import { OnModuleInit } from '@nestjs/common';
import { UserDto } from 'src/modules/users/user.dto';
import { User } from './users.model';
import { Role } from 'src/roles/role.enum';
import { UserUpdateDto } from './userupdate.dto';
export declare class UsersService implements OnModuleInit {
    private readonly usersModel;
    constructor(usersModel: typeof User);
    onModuleInit(): Promise<void>;
    findAll(page: number, elements: number): Promise<{
        rows: User[];
        count: number;
    }>;
    findByRole(role: Role): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(userDto: UserDto): Promise<User>;
    findByLogin(login: string): Promise<User>;
    changePassword(id: string, newPassword: string): Promise<User>;
    selfChangePassword(oldPassword: string, newPassword: string, user: any): Promise<User>;
    update(id: string, userUpdateDto: UserUpdateDto): Promise<User>;
    activate(id: string): Promise<User>;
    disable(id: string): Promise<User>;
}
