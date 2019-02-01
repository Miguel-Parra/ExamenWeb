import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {PacienteEntity} from "./paciente.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Paciente} from "./paciente.controller";

@Injectable()

export class PacienteService {
    constructor (
        @InjectRepository(PacienteEntity)
            private readonly _pacienteRepository: Repository<PacienteEntity>){

    }

    async crear(nuevoPaciente: Paciente): Promise<PacienteEntity> {

        // Instanciar una entidad -> .create()
        const usuarioEntity = this._pacienteRepository.create(nuevoPaciente);
        const usuarioCreado = await this._pacienteRepository.save(usuarioEntity);
        return usuarioCreado;

    }

}