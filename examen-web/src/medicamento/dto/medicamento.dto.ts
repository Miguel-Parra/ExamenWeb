import {IsAlpha, IsDateString, IsNotEmpty, IsNumber, IsString, Matches} from "class-validator";

export class medicamentoDto{

    @IsNumber()
    @IsNotEmpty()
    gramosAIngerir:number;

    @IsNotEmpty()
    @Matches(/^([a-z ñáéíóú]{2,60})$/i)
    nombreMedicamento:string;

    @IsNotEmpty()
    @Matches(/^([a-z ñáéíóú]{2,60})$/i)
    composicion:string;

    @IsNotEmpty()
    @Matches(/^([a-z ñáéíóú]{2,60})$/i)
    usadoPara:string;

    @IsDateString()
    @IsNotEmpty()
    fechaCaducidad:string;

    @IsNotEmpty()
    @IsNumber()
    numeroPastillas:number;

}