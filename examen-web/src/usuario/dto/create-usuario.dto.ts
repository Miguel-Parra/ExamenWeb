import {IsAlpha, IsDateString, IsNotEmpty, Matches} from "class-validator";

export class CreateUsuarioDto {

    @IsNotEmpty()
    @IsAlpha()
    nombre:string;


    @IsNotEmpty()
    correo:string;

    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/
        ,{message: 'Contraseña erronea'})
    @IsNotEmpty()
    password:string;


    @IsDateString()
    @IsNotEmpty()
    fechaNacimiento: string;

}