import {IsNotEmpty, Matches} from "class-validator";

export class CreateLoginDto {

    @IsNotEmpty({message: '// Campo correo no debe estar vacio //'})
    @Matches(/[\w]+@{1}[\w]+\.[a-z]{2,3}/,{message:'// El correo debe tener @_____.com //'})
    correo:string;

    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/,{message:'// Contraseña al menos debe tener Mayuscula, Minuscula, Numeros, caracteres especial (8-16) //'})
    @IsNotEmpty({message: '// Campo password no debe estar vacio //'})
    password:string;

}