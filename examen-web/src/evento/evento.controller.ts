import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Evento, EventoService} from "./evento.service";
import {PacienteEntity} from "../paciente/paciente.entity";
import {EventoEntity} from "./evento.entity";
import {FindManyOptions, Like} from "typeorm";
import {Paciente} from "../paciente/paciente.service";
import {medicamentoDto} from "../medicamento/dto/medicamento.dto";
import {validate, ValidationError} from "class-validator";
import {CreateEventoDto} from "./dto/create-evento.dto";

@Controller('evento')

export class EventoController {

    constructor(private readonly _eventoService: EventoService) {
    }


    @Get('inicio')
    async mostrarInicio(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
        @Session() sesion
    ) {

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

                evento = await this._eventoService.buscar();
            }
            response.render('lista-eventos', {
                arregloEvento: evento,
                mensaje: mensaje,
            })

        }else{
            response.redirect('/login')
        }

    }

    @Get('crear-evento')
    mostrarCrearEvento(
        @Res() response,
		 @Session() sesion,
		 @Query('error') error: string

       
    ){
        if(sesion.rol==='usuario') {
			let mensaje = undefined;

        if (error) {
            mensaje = "Datos erroneos";
        }
            response.render('crear-evento',{
                mensaje: mensaje
            })
        }else{
            response.redirect('/login')
        }

    }

    @Post('crear-evento')
    async metodoCrearEvento(
        @Res() response,
        @Body() evento: Evento,
    ) {
        let mensaje = undefined;

        const objetoValidacionEvento = new CreateEventoDto();

        objetoValidacionEvento.nombreEvento = evento.nombreEvento

        const fec = new Date(evento.fechaEvento).toISOString();
        objetoValidacionEvento.fechaEvento = fec

        const errores: ValidationError[] =
            await validate(objetoValidacionEvento);

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores);

            const parametrosConsulta = `?error=${errores[0].constraints}`;

            response.redirect('/evento/crear-evento/' + parametrosConsulta)
        } else {

            await this._eventoService.crear(evento);
            const parametrosConsulta = `?accion=crear&nombre=${evento.nombreEvento}`;

            response.redirect('/evento/inicio' + parametrosConsulta)

        }
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
        @Query('error') error: string,
        @Session() sesion
    ) {

        if(sesion.rol==='usuario') {

            let mensaje = undefined;
        if (error) {
            mensaje = "Datos erroneos";
        }


            const eventoActualizar = await this._eventoService
                .buscarPorId(Number(idEvento));

            response.render(
                'crear-evento', {//ir a la pantalla de crear-usuario
                    evento: eventoActualizar,
                    mensaje: mensaje,
					 idEvento: idEvento
                }
            )
        }else{
            response.redirect('/login')
        }

    }

    @Post('actualizar-evento/:idEvento')
    async actualizarPacienteFormulario(
        @Param('idEvento') idEvento: string,
        @Res() response,
        @Body() evento: Evento
    ) {
        let mensaje = undefined;

        const objetoValidacionEvento = new CreateEventoDto();

        objetoValidacionEvento.nombreEvento = evento.nombreEvento

        const fec = new Date(evento.fechaEvento).toISOString();
        objetoValidacionEvento.fechaEvento = fec

        const errores: ValidationError[] =
            await validate(objetoValidacionEvento);

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores);

            const parametrosConsulta = `?error=${errores[0].constraints}`;

            response.redirect('/evento/actualizar-evento/'+ idEvento + parametrosConsulta)
        } else {
            evento.id = +idEvento;

            await this._eventoService.actualizar(evento);

            const parametrosConsulta = `?accion=actualizar&nombre=${evento.nombreEvento}`;

            response.redirect('/evento/inicio' + parametrosConsulta);
        }
    }
}

