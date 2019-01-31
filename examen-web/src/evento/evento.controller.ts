import {Controller} from "@nestjs/common";
import {EventoService} from "./evento.service";

@Controller('evento')

export class EventoController{

    constructor (private readonly _eventoService: EventoService){
    }


}