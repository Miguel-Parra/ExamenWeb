import {Injectable} from "@nestjs/common";
import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import {RolPorUsuarioEntity} from "./rol-por-usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {RolEntity} from "../rol/rol.entity";


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


    async encontrarRol(idUsuario:number, idRol:number): Promise<RolPorUsuarioEntity> {
        const consulta: FindOneOptions<RolPorUsuarioEntity> = {
            where: {
                usuario:idUsuario,
                rol: idRol,
            },
            relations:['rol']
        };

        return await this._rolPorUsuarioRepository.findOne(consulta)

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

    async crear(rolPorUsuario: RolPorUsuario): Promise<RolPorUsuarioEntity>{

        const rolPorUsuarioEntity = this._rolPorUsuarioRepository.create(rolPorUsuario);
        const rolPorUsuarioCreado = await this._rolPorUsuarioRepository.save(rolPorUsuarioEntity);
        return rolPorUsuarioCreado;


    }

}

export interface RolPorUsuario{
    id?:number;
    rol:RolEntity;
    usuario:UsuarioEntity;
}