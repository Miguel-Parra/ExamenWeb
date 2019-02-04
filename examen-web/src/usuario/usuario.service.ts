import {Injectable} from "@nestjs/common";
import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Usuario} from "./usuario.controller";
import {PacienteEntity} from "../paciente/paciente.entity";
import {Paciente} from "../paciente/paciente.service";
import {stringify} from "querystring";

@Injectable()

export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)

        private readonly _usuarioRepository: Repository<UsuarioEntity>) {
    }


    buscar(parametros?: FindManyOptions<UsuarioEntity>): Promise<UsuarioEntity[]> {
        return this._usuarioRepository.find(parametros)
    }


    async crear(nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        // Instanciar una entidad -> .create()
        const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);
        const usuarioCreado = await this._usuarioRepository.save(usuarioEntity);
        return usuarioCreado;
    }


    borrar(id: number): Promise<UsuarioEntity> {
        const usuarioEntityEliminar = this._usuarioRepository.create({
            id: id
        });
        return this._usuarioRepository.remove(usuarioEntityEliminar)
    }

    buscarPorId(id: number): Promise<UsuarioEntity> {
        return this._usuarioRepository.findOne(id)
    }

    async autenticar(username: string, password: string): Promise<UsuarioEntity> {
        const consulta: FindOneOptions<UsuarioEntity> = {
            where: {
                nombre: username,
                password: password
            }
        };

        return await this._usuarioRepository.findOne(consulta)

    }



}







