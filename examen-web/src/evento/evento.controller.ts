import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Evento, EventoService} from "./evento.service";
import {PacienteEntity} from "../paciente/paciente.entity";
import {EventoEntity} from "./evento.entity";
import {FindManyOptions, Like} from "typeorm";
import {Paciente} from "../paciente/paciente.service";

@Controller('evento')

export class EventoController{

    constructor (private readonly _eventoService: EventoService){
    }


    @Get('inicio')
    async  mostrarInicio(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
        @Session() sesion
    ){

        console.log(sesion.rol)

        if(sesion.rol==='usuario') {
            let mensaje = undefined;
            console.log(sesion)

            if (accion && nombre) {
                switch (accion) {
                    case 'actualizar':
                        mensaje = `Registro ${nombre} actualizado`;
                        break;
                    case 'borrar':
                        mensaje = `Registro ${nombre} eliminado`;
                        break;
                    case 'crear':
                        mensaje = `Registro ${nombre} creado`;
                        break;
                }
            }

            let evento: EventoEntity[]

            if (busqueda) {

                const consulta: FindManyOptions<EventoEntity> = {
                    where: [
                        {
                            nombreEvento: Like(`%${busqueda}%`)
                        },

                    ]
                };

                evento = await this._eventoService.buscar(consulta);
            } else {

                evento= await this._eventoService.buscar();
            }
            response.render('lista-eventos',{
                arregloEvento:evento,
                mensaje: mensaje,
            })
        }else{
            throw new BadRequestException({mensaje: "No tiene acceso a esta vista"});
        }

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

        response.redirect('/evento/inicio' + parametrosConsulta)

    }

    @Post('eliminar-evento/:idEvento')
    async borrarEvento(
        @Param('idEvento') idEvento: string,
        @Res() response
    ) {
        const eventoeEncontrado = await this._eventoService
            .buscarPorId(+idEvento);

        await this._eventoService.borrar(Number(idEvento));

        const parametrosConsulta = `?accion=borrar&nombre=${eventoeEncontrado.nombreEvento}`;

        response.redirect('/evento/inicio' + parametrosConsulta);
    }

    @Get('actualizar-evento/:idEvento')
    async actualizarEvento(
        @Param('idEvento') idEvento: string,
        @Res() response,
        @Query('error') error: string
    ) {

        let mensaje = undefined;


        const eventoActualizar = await this._eventoService
            .buscarPorId(Number(idEvento));

        response.render(
            'crear-evento', {//ir a la pantalla de crear-usuario
                evento: eventoActualizar,
                mensaje: mensaje
            }
        )
    }

    @Post('actualizar-evento/:idEvento')
    async actualizarPacienteFormulario(
        @Param('idEvento') idEvento: string,
        @Res() response,
        @Body() evento :Evento
    ) {
        let mensaje = undefined;
        evento.id = +idEvento;

        await this._eventoService.actualizar( evento);

        const parametrosConsulta = `?accion=actualizar&nombre=${evento.nombreEvento}`;

        response.redirect('/evento/inicio' + parametrosConsulta);
    }

}

