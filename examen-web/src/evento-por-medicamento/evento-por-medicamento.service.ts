import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {EventoPorMedicamentoEntity} from "./evento-por-medicamento.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()

export class EventoPorMedicamentoService {
    constructor(
        @InjectRepository(EventoPorMedicamentoEntity)
        private readonly _eventoPorMedicamentoRepository: Repository<EventoPorMedicamentoEntity>){

    }

    
}