import {
    IsAlpha,
    IsBoolean,
    IsDate,
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString, Matches,
    Max,
    Min
} from "class-validator";

export class CreatePacienteDto{

    @IsNotEmpty()
    @Matches(/^[a-zA-Z\\s]*$/)
    nombres:string;

    @IsNotEmpty()
    @Matches(/^[a-zA-Z\\s]*$/)
    apellidos:string;

    @IsDateString()
    @IsNotEmpty()
    fecha_nacimiento: string;


    @IsNotEmpty()
    @IsInt()
    @Min(0)
    hijos: number;

    @IsNotEmpty()
    @IsBoolean()
    tieneSeguro: boolean;
}