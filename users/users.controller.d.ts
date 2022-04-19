import { UserDto } from './user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./users.model").User[]>;
    findOne(id: string): Promise<import("./users.model").User>;
    create(userDto: UserDto): Promise<import("./users.model").User>;
    changePassword(id: string, password: string): Promise<import("./users.model").User>;
    activate(id: string, password: string): Promise<import("./users.model").User>;
    disable(id: string): Promise<import("./users.model").User>;
}
