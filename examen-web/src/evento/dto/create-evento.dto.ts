import {IsAlpha, IsDateString, IsNotEmpty, IsNumber, Matches} from "class-validator";

export class CreateEventoDto {

    @IsNotEmpty()
    @Matches(/^([a-z ñáéíóú]{2,60})$/i)
    nombreEvento:string

    @IsDateString()
    @IsNotEmpty()
    fechaEvento:string;

}