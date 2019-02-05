import {Controller, Get, Res} from "@nestjs/common";
import {EventoService} from "./evento.service";

@Controller('evento')

export class EventoController{

    constructor (private readonly _eventoService: EventoService){
    }
@Get('crear-evento')
    mostrarCrearEvento(
        @Res() response
){
        response.render('crear-evento')
}


}

