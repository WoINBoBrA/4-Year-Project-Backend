import { Role } from 'src/roles/role.enum';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';
import { UserUpdateDto } from './userupdate.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(page: number, elements: number): Promise<{
        rows: import("./users.model").User[];
        count: number;
    }>;
    findOne(id: string): Promise<import("./users.model").User>;
    findByRole(role: Role): Promise<import("./users.model").User[]>;
    create(userDto: UserDto): Promise<import("./users.model").User>;
    update(id: string, userUpdateDto: UserUpdateDto): Promise<import("./users.model").User>;
    changePassword(id: string, password: string): Promise<import("./users.model").User>;
    selfChangePassword(oldPassword: string, newPassword: string, req: any): Promise<import("./users.model").User>;
    activate(id: string): Promise<import("./users.model").User>;
    disable(id: string): Promise<import("./users.model").User>;
}
