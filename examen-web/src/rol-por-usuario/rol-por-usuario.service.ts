import {Injectable} from "@nestjs/common";
import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import {RolPorUsuarioEntity} from "./rol-por-usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()


export class RolPorUsuarioService {
    constructor (
        @InjectRepository(RolPorUsuarioEntity)
        private readonly _rolPorUsuarioRepository: Repository<RolPorUsuarioEntity>){

    }


    async verificarRol(idUsuario: number): Promise<RolPorUsuarioEntity> {

        const consulta: FindOneOptions<RolPorUsuarioEntity> = {
            where: {
                usuario: idUsuario,

            },
            relations:['rol','usuario']
        };
        return await this._rolPorUsuarioRepository.findOne(consulta);
    }

    async obtenerRoles(idUsuario: number): Promise<RolPorUsuarioEntity[]> {

        const consulta: FindManyOptions<RolPorUsuarioEntity> = {
            where: {
                usuario: idUsuario,
            },
            relations:['rol','usuario']
        };
        return await this._rolPorUsuarioRepository.find(consulta);
    }

    borrar(id: number): Promise<RolPorUsuarioEntity> {
        const rolUsuarioEntityEliminar = this._rolPorUsuarioRepository.create({
            id: id
        });
        return this._rolPorUsuarioRepository.remove(rolUsuarioEntityEliminar)
    }


    async buscarPorId(idRolPorUsuario: number): Promise<RolPorUsuarioEntity> {

        const consulta: FindOneOptions<RolPorUsuarioEntity> = {
            where: {
                id: idRolPorUsuario,

            },
            relations:['usuario']
        };
        return await this._rolPorUsuarioRepository.findOne(consulta);
    }





}