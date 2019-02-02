import {Injectable} from "@nestjs/common";
import {FindOneOptions, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Usuario} from "./usuario.controller";
import {PacienteEntity} from "../paciente/paciente.entity";
import {Paciente} from "../paciente/paciente.service";

@Injectable()

export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)

        private readonly _usuarioRepository: Repository<UsuarioEntity>) {
    }

    async crear(nuevoUsuario: Usuario): Promise<UsuarioEntity> {

        // Instanciar una entidad -> .create()
        const usuarioEntity = this._usuarioRepository.create(nuevoUsuario);
        const usuarioCreado = await this._usuarioRepository.save(usuarioEntity);
        return usuarioCreado;
    }

    async autenticar(username: string, password: string): Promise<UsuarioEntity> {

        const consulta: FindOneOptions<UsuarioEntity> = {
            where: {
                username: username,
                password: password
            }
        };

        return await this._usuarioRepository.findOne(consulta)


    }
}







