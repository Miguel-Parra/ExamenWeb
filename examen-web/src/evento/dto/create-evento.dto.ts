import {IsAlpha, IsDateString, IsNotEmpty, IsNumber} from "class-validator";

export class CreateEventoDto {

    @IsNotEmpty()
    @IsAlpha()
    nombreEvento:string

    @IsDateString()
    @IsNotEmpty()
    fechaEvento:string;

}