import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {PacienteEntity} from "./paciente.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Injectable()

export class PacienteService {
    constructor (
        @InjectRepository(PacienteEntity)
            private readonly _pacienteRepository: Repository<PacienteEntity>)
    {

    }

    //buscar
    buscar(parametros?: FindManyOptions<PacienteEntity>): Promise<PacienteEntity[]> {
        return this._pacienteRepository.find(parametros)
    }

    async crear(nuevoPaciente: Paciente): Promise<PacienteEntity> {

        // Instanciar una entidad -> .create()
        const pacienteEntity = this._pacienteRepository.create(nuevoPaciente);
        const pacienteCreado = await this._pacienteRepository.save(pacienteEntity);
        return pacienteCreado;
    }

    actualizar(id: number, nuevoPaciente: Paciente): Promise<PacienteEntity> {

        nuevoPaciente.id = id;
        const pacienteEntity = this._pacienteRepository.create(nuevoPaciente);
        return this._pacienteRepository.save(pacienteEntity)
    }

    borrar(id: number): Promise<PacienteEntity> {
        const pacienteEntityEliminar = this._pacienteRepository.create({
            id: id
        });
        return this._pacienteRepository.remove(pacienteEntityEliminar)
    }

    buscarPorId(id: number): Promise<PacienteEntity> {
        return this._pacienteRepository.findOne(id)
    }
}

export interface Paciente{
    id?:number;
    nombres:string;
    apellidos:string;
    fechaNacimiento:string;
    hijos: number;
    tieneSeguro: boolean;
    usuario:UsuarioEntity;
}
