import {IsNotEmpty, Matches} from "class-validator";

export class CreateLoginDto {

    @IsNotEmpty()
    correo:string;

    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/)
    @IsNotEmpty()
    password:string;

}