import {Controller} from "@nestjs/common";
import {RolPorUsuarioService} from "./rolPorUsuario.service";

@Controller('rolPorUsuario')

export class RolPorUsuarioController {
    constructor( private readonly _rolPorUsuarioService: RolPorUsuarioService){

    }

}