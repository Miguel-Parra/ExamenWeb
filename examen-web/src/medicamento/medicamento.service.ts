import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {MedicamentoEntity} from "./medicamento.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class MedicamentoService {
    constructor (
        @InjectRepository(MedicamentoEntity)
        private readonly _medicamentoRepository: Repository<MedicamentoEntity>){

    }
    
}