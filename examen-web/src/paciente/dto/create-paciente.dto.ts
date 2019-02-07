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

    @IsNotEmpty({message: '// Campo nombres no debe estar vacio //'})
    @Matches(/^([a-z ñáéíóú]{2,60})$/i,{message: '// Nombres no debe tener números //'})
    nombres:string;

    @IsNotEmpty({message: '// Campo apellidos no debe estar vacio //'})
    @Matches(/^([a-z ñáéíóú]{2,60})$/i,{message: '// Apellidos no debe tener números //'})
    apellidos:string;

    @IsDateString({message: '// Fecha de nacimiento no puede pasar de la fecha de hoy //'})
    @IsNotEmpty({message: '// Campo Fecha de nacimiento no debe estar vacio //'})
    fecha_nacimiento: string;


    @IsNotEmpty({message: '// Campo hijos no debe estar vacio //'})
    @IsInt({message: '// Campo hijos acepta solo numeros //'})
    @Min(0)
    @Max(15)
    hijos: number;

    @IsNotEmpty({message: '// Campo tiene seguro no debe estar vacio //'})
    @IsBoolean({message: '// En el campo seguro debe elegir si o no //'})
    tieneSeguro: boolean;
}