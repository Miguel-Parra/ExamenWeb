import {IsAlpha, IsDateString, IsNotEmpty, IsNumber, IsString, Matches} from "class-validator";

export class medicamentoDto{

    @IsNumber({},{message:'// Campo gramos a ingerir debe tener solo numeros //'})
    @IsNotEmpty({message: '// Campo gramos a ingerir no debe estar vacio //'})
    gramosAIngerir:number;

    @IsNotEmpty({message: '// Campo nombre medicamento no debe estar vacio //'})
    @Matches(/^([a-z ñáéíóú]{2,60})$/i,{message:'// El campo nombre del medicamento no debe tener numeros //'})
    nombreMedicamento:string;

    @IsNotEmpty({message: '// Campo composicion no debe estar vacio //'})
    @Matches(/^([a-z ñáéíóú]{2,60})$/i,{message:'// El campo composicion no debe tener numeros //'})
    composicion:string;

    @IsNotEmpty({message: '// Campo usado para no debe estar vacio //'})
    @Matches(/^([a-z ñáéíóú]{2,60})$/i,{message:'// El campo usado parano debe tener numeros //'})
    usadoPara:string;

    @IsDateString({message: '// Fecha de caducidad no puede ser menor a la fecha actual //'})
    @IsNotEmpty({message: '// Campo fecha de caducidad no debe estar vacio //'})
    fechaCaducidad:string;

    @IsNotEmpty({message: '// Campo numero de pastillas no debe estar vacio //'})
    @IsNumber({},{message:'// Campo numero de pastillas debe tener solo numeros //'})
    numeroPastillas:number;

}