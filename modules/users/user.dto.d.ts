import { Role } from "../../roles/role.enum";
export declare class UserDto {
    readonly login: string;
    readonly password: string;
    readonly firstName: string;
    readonly secondName: string;
    readonly role: Role;
    readonly isActive?: boolean;
}
