import {Injectable} from "@nestjs/common";
import {FindOneOptions, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Usuario} from "./usuario.controller";

@Injectable()

export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)

        private readonly _usuarioRepository: Repository<UsuarioEntity>) {
    }


    async autenticar(username: string, password: string): Promise<UsuarioEntity> {
console.log(username, password)

     


    async autenticar (username:string, password: string):Promise<boolean> {

        const consulta: FindOneOptions<UsuarioEntity> = {
            where: {
                username: username,
                password: password
            }
        };

        const respuesta = await this._usuarioRepository.findOne(consulta) ;

        if (respuesta) {
            return true;
        }else{
            return false;
        }

    }





    }
}