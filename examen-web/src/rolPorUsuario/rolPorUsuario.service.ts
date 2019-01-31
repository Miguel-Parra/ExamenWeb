import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {RolPorUsuarioEntity} from "./rolPorUsuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()


export class RolPorUsuarioService {
    constructor (
        @InjectRepository(RolPorUsuarioEntity)
        private readonly _rolPorUsuarioRepository: Repository<RolPorUsuarioEntity>){

    }

}