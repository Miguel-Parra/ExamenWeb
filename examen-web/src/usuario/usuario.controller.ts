import {Controller} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

@Controller()

export class UsuarioController {
    constructor( private readonly _usuarioService: UsuarioService){

    }
    
}