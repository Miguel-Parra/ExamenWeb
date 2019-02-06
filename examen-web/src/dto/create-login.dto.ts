import {IsNotEmpty, Matches} from "class-validator";

export class CreateLoginDto {

    @IsNotEmpty()
    @Matches(/[\w]+@{1}[\w]+\.[a-z]{2,3}/)
    correo:string;

    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/)
    @IsNotEmpty()
    password:string;

}