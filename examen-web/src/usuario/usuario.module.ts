import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {RolPorUsuarioModule} from "../rol-por-usuario/rol-por-usuario.module";

@Module(
    {
        imports:[TypeOrmModule.forFeature([UsuarioEntity])],
        controllers:[UsuarioController],
        providers:[UsuarioService],
        exports:[UsuarioService]

    }
)

export class UsuarioModule{

}