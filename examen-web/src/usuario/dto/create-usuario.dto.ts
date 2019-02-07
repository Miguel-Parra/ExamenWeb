import {IsAlpha, IsDateString, IsNotEmpty, Matches} from "class-validator";

export class CreateUsuarioDto {

    @IsNotEmpty({message: '// Campo nombre no debe estar vacio //'})
    @Matches(/^([a-z ñáéíóú]{2,60})$/i,{message: '// Nombre no debe tener números //'})
    nombre:string;


    @IsNotEmpty({message: '// Campo correo no debe estar vacio //'})
    @Matches(/[\w]+@{1}[\w]+\.[a-z]{2,3}/,{message: '// El correo debe tener @_____.com //'})
    correo:string;


    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/
        ,{message: '// Contraseña al menos debe tener Mayuscula, Minuscula, Numeros, caracteres especial (8-16) //'})
    @IsNotEmpty({message: '// Campo apellido no debe estar vacio //'})
    password:string;


    @IsDateString({message: '// Fecha de nacimiento no puede pasar de esta fecha //'})
    @IsNotEmpty({message: '// Campo Fecha de Nacimiento no debe estar vacio //'})
    fechaNacimiento: string;

}