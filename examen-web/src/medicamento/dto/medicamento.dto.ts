import {IsDateString, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class medicamentoDto{

    @IsNumber()
    @IsNotEmpty()
    gramosAIngerir:number;

    @IsNotEmpty()
    @IsString()
    nombreMedicamento:string;

    @IsNotEmpty()
    @IsString()
    composicion:string;

    @IsNotEmpty()
    @IsString()
    usadoPara:string;

    @IsDateString()
    @IsNotEmpty()
    fechaCaducidad:string;

    @IsNotEmpty()
    @IsNumber()
    numeroPastillas:number

}