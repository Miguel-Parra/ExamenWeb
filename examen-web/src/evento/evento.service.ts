import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {EventoEntity} from "./evento.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class EventoService {
    constructor(
        @InjectRepository(EventoEntity)
        private readonly _eventoRepository: Repository<EventoEntity>){
    }
    
}