import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RolEntity} from "./rol.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

Injectable()

export class RolService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolRepository: Repository<RolEntity>
    ){}



}



