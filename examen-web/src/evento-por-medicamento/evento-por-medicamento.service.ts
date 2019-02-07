import {Injectable} from "@nestjs/common";
import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import {EventoPorMedicamentoEntity} from "./evento-por-medicamento.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {RolPorUsuarioEntity} from "../rol-por-usuario/rol-por-usuario.entity";
import {RolEntity} from "../rol/rol.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {EventoEntity} from "../evento/evento.entity";
import {MedicamentoEntity} from "../medicamento/medicamento.entity";

@Injectable()

export class EventoPorMedicamentoService {
    constructor(
        @InjectRepository(EventoPorMedicamentoEntity)
        private readonly _eventoPorMedicamentoRepository: Repository<EventoPorMedicamentoEntity>){

    }

    async verificarEvento(idMediacemento: number): Promise<EventoPorMedicamentoEntity> {

        const consulta: FindOneOptions<EventoPorMedicamentoEntity> = {
            where: {
                medicamento: idMediacemento,

            },
            relations:['medicamento','evento']
        };
        return await this._eventoPorMedicamentoRepository.findOne(consulta);
    }


    async encontrarEvento (idMedicamento:number, idEvento:number): Promise<EventoPorMedicamentoEntity> {
        const consulta: FindOneOptions<EventoPorMedicamentoEntity> = {
            where: {
                medicamento:idMedicamento,
                evento: idEvento,
            },
            relations:['evento','medicamento']
        };

        return await this._eventoPorMedicamentoRepository.findOne(consulta)

    }


    async obtenerEvento(idMedicamento: number): Promise<EventoPorMedicamentoEntity[]> {

        const consulta: FindManyOptions<EventoPorMedicamentoEntity> = {
            where: {
                medicamento: idMedicamento,
            },
            relations:['evento','medicamento']
        };
        return await this._eventoPorMedicamentoRepository.find(consulta);
    }

    async obtenerMedicamento(idEvento: number): Promise<EventoPorMedicamentoEntity[]> {

        const consulta: FindManyOptions<EventoPorMedicamentoEntity> = {
            where: {
                evento: idEvento,
            },
            relations:['medicamento']
        };
        return await this._eventoPorMedicamentoRepository.find(consulta);
    }


    async obtenerMedicamentoNombre(idEvento: number): Promise<EventoPorMedicamentoEntity[]> {

        const consulta: FindOneOptions<EventoPorMedicamentoEntity> = {
            where: {
                evento: idEvento,
            },
            relations:['evento']
        };
        return await this._eventoPorMedicamentoRepository.find(consulta);
    }


    borrar(id: number): Promise<EventoPorMedicamentoEntity> {
        const eventoMedicamentoEntityEliminar = this._eventoPorMedicamentoRepository.create({
            id: id
        });
        return this._eventoPorMedicamentoRepository.remove(eventoMedicamentoEntityEliminar)
    }


    async buscarPorId(idEventoPorMedicamento: number): Promise<EventoPorMedicamentoEntity> {

        const consulta: FindOneOptions<EventoPorMedicamentoEntity> = {
            where: {
                id: idEventoPorMedicamento,

            },
            relations:['medicamento']
        };
        return await this._eventoPorMedicamentoRepository.findOne(consulta);
    }

    async crear(eventoPorMedicamento: EventoPorMedicamento): Promise<EventoPorMedicamentoEntity>{

        const eventoPorMedicamentoEntity = this._eventoPorMedicamentoRepository.create(eventoPorMedicamento);
        const eventoPorMedicamentoCreado = await this._eventoPorMedicamentoRepository.save(eventoPorMedicamentoEntity);
        return eventoPorMedicamentoCreado;


    }

}

export interface EventoPorMedicamento{
    id?:number;
    medicamento:MedicamentoEntity;
    evento:EventoEntity;

}
