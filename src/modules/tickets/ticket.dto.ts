import { IsNumber, IsOptional, IsString } from "class-validator";

export class TicketDto {

    @IsString()
    readonly theme: string;

    @IsNumber()
    readonly categoryId: number;

    @IsNumber()
    @IsOptional()
    readonly workerId?: number;
}