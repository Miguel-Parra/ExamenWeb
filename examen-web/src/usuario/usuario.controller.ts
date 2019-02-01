import {Controller, Get, Res} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

@Controller('usuario')

export class UsuarioController {
    constructor( private readonly _usuarioService: UsuarioService){

    }



}
export interface Usuario{
    id?:number;
    nombre: string;
    correo: string;
    password: string;
    fechaNacimiento: string
}