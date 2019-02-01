import {Injectable} from "@nestjs/common";
import {FindOneOptions, Repository} from "typeorm";
import {RolPorUsuarioEntity} from "./rol-por-usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Injectable()


export class RolPorUsuarioService {
    constructor (
        @InjectRepository(RolPorUsuarioEntity)
        private readonly _rolPorUsuarioRepository: Repository<RolPorUsuarioEntity>){

    }


    async acceso(idUsuario: number): Promise<RolPorUsuarioEntity> {

        const consulta: FindOneOptions<RolPorUsuarioEntity> = {
            where: {
                usuario: idUsuario
            }
        };
        return await this._rolPorUsuarioRepository.findOne(consulta);

    }

}