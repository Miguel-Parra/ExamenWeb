import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {RolPorUsuarioEntity} from "./rolPorUsuario.entity";
import {RolPorUsuarioController} from "./rolPorUsuario.controller";
import {RolPorUsuarioService} from "./rolPorUsuario.service";

@Module(
    {
        imports:[TypeOrmModule.forFeature([RolPorUsuarioEntity])],
        controllers:[RolPorUsuarioController],
        providers:[RolPorUsuarioService],
        exports:[RolPorUsuarioService]
    }
)

export class RolPorUsuarioModule{

}