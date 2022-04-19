import { IsString } from "class-validator";

export class MessageDto {
    @IsString()
    readonly text: string;
}