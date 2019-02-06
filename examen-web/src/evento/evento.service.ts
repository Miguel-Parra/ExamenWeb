import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {EventoEntity} from "./evento.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {PacienteEntity} from "../paciente/paciente.entity";
import {Paciente} from "../paciente/paciente.service";

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


}
export interface Evento{
    nombreEvento: string
    fechaEvento: Date
    longitud: number
    latitud: number
}