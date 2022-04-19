import { IsAlphanumeric, IsAlpha, Matches, IsNumber, IsBoolean, IsOptional, IsString } from "class-validator";
import { Role } from "../../roles/role.enum";


export class UserDto {
    
    @IsAlphanumeric()
    readonly login: string;

    @IsAlphanumeric()
    readonly password: string;

    @IsString()
    readonly firstName: string;

    @IsString()
    readonly secondName: string;

    @IsNumber()
    readonly role: Role;

    @IsBoolean()
    @IsOptional()
    readonly isActive?: boolean;
   
}