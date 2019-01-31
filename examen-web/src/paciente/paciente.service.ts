import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {PacienteEntity} from "./paciente.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()

export class PacienteService {
    constructor (
        @InjectRepository(PacienteEntity)
            private readonly _pacienteRepository: Repository<PacienteEntity>){

    }

}