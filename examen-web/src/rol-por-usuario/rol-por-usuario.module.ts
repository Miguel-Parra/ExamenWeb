import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolPorUsuarioEntity} from "./rol-por-usuario.entity";
import {RolPorUsuarioController} from "./rol-por-usuario.controller";
import {RolPorUsuarioService} from "./rol-por-usuario.service";
import {UsuarioModule} from "../usuario/usuario.module";

@Module(
    {
        imports:[TypeOrmModule.forFeature([RolPorUsuarioEntity]), UsuarioModule],
        controllers:[RolPorUsuarioController],
        providers:[RolPorUsuarioService],
        exports:[RolPorUsuarioService]
    }
)

export class RolPorUsuarioModule{

}