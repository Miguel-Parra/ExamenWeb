import {
    IsAlpha,
    IsBoolean, IsBooleanString,
    IsDate,
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString, Matches,
    Max,
    Min, MinDate
} from "class-validator";

export class CreatePacienteDto{

    @IsNotEmpty()
    @IsAlpha()
    nombres:string;

    @IsNotEmpty()
    @IsAlpha()
    apellidos:string;

    @IsDateString()
    @IsNotEmpty()
    fecha_nacimiento: string;


    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(15)
    hijos: number;

    @IsNotEmpty()
    @IsBoolean()
    tieneSeguro: boolean;
}