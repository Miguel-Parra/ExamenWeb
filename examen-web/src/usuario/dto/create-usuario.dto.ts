import {IsAlpha, IsDateString, IsNotEmpty, Matches} from "class-validator";

export class CreateUsuarioDto {

    @IsNotEmpty()
    @Matches(/^([a-z ñáéíóú]{2,60})$/i)
    nombre:string;


    @IsNotEmpty()
    @Matches(/[\w]+@{1}[\w]+\.[a-z]{2,3}/)
    correo:string;

    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/
        ,{message: 'Contraseña erronea'})
    @IsNotEmpty()
    password:string;


    @IsDateString()
    @IsNotEmpty()
    fechaNacimiento: string;

}