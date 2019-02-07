import {IsAlpha, IsDateString, IsNotEmpty, IsNumber, Matches} from "class-validator";

export class CreateEventoDto {

    @IsNotEmpty({message: '// Campo Nombre del evento no debe estar vacio //'})
    @Matches(/^([a-z ñáéíóú]{2,60})$/i,{message:'// El campo nombre del evento no debe tener numeros //'})
    nombreEvento:string

    @IsDateString({message: '// Fecha del evento no debe ser anterior a la actual //'})
    @IsNotEmpty({message: '// Campo Fecha del evento no debe estar vacio //'})
    fechaEvento:string;

}