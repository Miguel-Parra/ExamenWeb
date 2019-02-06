import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {EventoEntity} from "./evento.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {PacienteEntity} from "../paciente/paciente.entity";
import {Paciente} from "../paciente/paciente.service";
import {RolEntity} from "../rol/rol.entity";

@Injectable()
export class EventoService {
    constructor(
        @InjectRepository(EventoEntity)
        private readonly _eventoRepository: Repository<EventoEntity>){
    }

    buscar(parametros?: FindManyOptions<EventoEntity>): Promise<EventoEntity[]> {
        return this._eventoRepository.find(parametros)
    }

    async crear(evento: Evento): Promise<EventoEntity> {

        // Instanciar una entidad -> .create()
        const eventoEntity = this._eventoRepository.create(evento);
        const eventoCreado = await this._eventoRepository.save(eventoEntity);
        return eventoCreado;
    }


    borrar(id: number): Promise<EventoEntity> {
        const eventoEntityEliminar = this._eventoRepository.create({
            id: id
        });
        return this._eventoRepository.remove(eventoEntityEliminar)
    }

    buscarPorId(id: number): Promise<EventoEntity> {
        return this._eventoRepository.findOne(id)
    }

    actualizar(nuevoEvento: Evento): Promise<EventoEntity> {


        const pacienteEntity = this._eventoRepository.create(nuevoEvento);
        return this._eventoRepository.save(pacienteEntity)
    }

    obtenerEvento(): Promise<EventoEntity[]> {
        return this._eventoRepository.find()
    }

}
export interface Evento{
    id?:number;
    nombreEvento: string
    fechaEvento: Date
    longitud: number
    latitud: number
}