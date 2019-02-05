import {IsAlpha, IsDateString, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class medicamentoDto{

    @IsNumber()
    @IsNotEmpty()
    gramosAIngerir:number;

    @IsNotEmpty()
    @IsAlpha()
    nombreMedicamento:string;

    @IsNotEmpty()
    @IsAlpha()
    composicion:string;

    @IsNotEmpty()
    @IsAlpha()
    usadoPara:string;

    @IsDateString()
    @IsNotEmpty()
    fechaCaducidad:string;

    @IsNotEmpty()
    @IsNumber()
    numeroPastillas:number;

}