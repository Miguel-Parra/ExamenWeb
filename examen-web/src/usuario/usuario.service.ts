import {Injectable} from "@nestjs/common";
import {FindOneOptions, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()

export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>) {
    }


    async autenticar(username: string, password: string): Promise<UsuarioEntity> {
console.log(username, password)
        const consulta: FindOneOptions<UsuarioEntity> = {
            where: {
                username: username,
                password: password
            }
        };
        return await this._usuarioRepository.findOne(consulta);

    }
}