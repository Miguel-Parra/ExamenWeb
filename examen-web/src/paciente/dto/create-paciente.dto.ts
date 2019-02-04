import {IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min} from "class-validator";

export class CreatePacienteDto{

    @IsNotEmpty()
    @IsString()
    nombres:string;

    @IsNotEmpty()
    @IsString()
    apellidos:string;

    @IsNotEmpty()
    @IsDate()
    fecha_nacimiento: string


    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(10)
    hijos: number;

    @IsNotEmpty()
    @IsBoolean()
    tieneSeguro: boolean


}