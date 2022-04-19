import { IsString } from "class-validator";

export class UserUpdateDto {

    @IsString()
    readonly firstName: string;

    @IsString()
    readonly secondName: string;
   
}