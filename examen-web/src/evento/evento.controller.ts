import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {Evento, EventoService} from "./evento.service";

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

@Post('crear-evento')
   async  metodoCrearEvento(
        @Res() response,
        @Body() evento:Evento,
){
        await this._eventoService.crear(evento);
    const parametrosConsulta = `?accion=crear&nombre=${evento.nombreEvento}`;

    response.redirect('/paciente/paciente' + parametrosConsulta)

}


}

