import {Get, Controller, Res, Post, Body, Session, BadRequestException, Query, Param} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";
import {RolPorUsuarioService} from "./rol-por-usuario/rol-por-usuario.service";
import {RolService} from "./rol/rol.service";
import {EventoEntity} from "./evento/evento.entity";
import {EventoPorMedicamentoEntity} from "./evento-por-medicamento/evento-por-medicamento.entity";
import {EventoService} from "./evento/evento.service";
import {FindManyOptions, Like} from "typeorm";
import {MedicamentoEntity} from "./medicamento/medicamento.entity";
import {EventoPorMedicamentoService} from "./evento-por-medicamento/evento-por-medicamento.service";

@Controller()
export class AppController {
    constructor(private readonly _appService: AppService,
                private readonly _usuarioService: UsuarioService,
                private readonly _rolPorUsuarioServicio: RolPorUsuarioService,
                private readonly _eventoService: EventoService,
                private readonly _eventoPorMedicamento:EventoPorMedicamentoService){
    }

    @Get('login')
    mostrarLogin(
        @Res() res,
        @Query("mensaje") mensaje
    ) {
        let mensajeVerificacion=undefined;
        if(mensaje){
            mensajeVerificacion=mensaje;
        }
        res.render('login', {mensajeVerificacion: mensajeVerificacion})
    }

    @Post('login')
    async metodoLogin(
        @Body('correo') correo: string,
        @Body('password') password: string,
        @Res() res,
        @Session() sesion,

    ) {

        const autenticacion = await this._usuarioService.autenticar(correo, password)

        if (autenticacion) {
            const idUsuario = autenticacion.id;
            const rolUsuario = await this._rolPorUsuarioServicio.verificarRol(+idUsuario)

            if (rolUsuario) {
                const nombreRol=rolUsuario.rol.nombreRol
                sesion.rol = nombreRol
                sesion.correo = correo;
                sesion.idUsuario = idUsuario;
                // console.log(sesion)
                switch (nombreRol) {
                    case 'usuario':
                        res.redirect('paciente/paciente')
                        break;
                    case 'administrador':
                        res.redirect('usuario/inicio')
                        break;
                    default:
                        res.send('Aun no se ha asignado una tarea para este rol')

                }
            } else {
                res.redirect('/login?mensaje=espere estamos verificando sus datos')
                //res.send('sin rol')
                //throw new BadRequestException({mensaje: 'Espere estamos verificando sus datos'})
            }

        } else {
            res.redirect('login')
        }
    }

    @Get('logout')
    async logout(
        @Res() res,
        @Session() sesion,
    )
    {

        sesion.usuario = undefined;
        sesion.destroy()
        res.redirect('login')
    }

    @Get('eventos')
    async mostrarEventos(
        @Res() response,
        @Query('busqueda') busqueda
    ){

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
        response.render('eventos',{
            arregloEvento:evento,

        })

    }

    @Get('ver-participantes/:idEvento')
    async mostrarParticipantes (
        @Res() response,
        @Param('idEvento') idEvento,
        @Query('nombreEvento') nombreEvento
    ){
        let eventoPorMedicamento:EventoPorMedicamentoEntity[]
        let evento: EventoPorMedicamentoEntity

        eventoPorMedicamento=await this._eventoPorMedicamento.obtenerMedicamento(+idEvento)
        response.render('lista-participantes',{
            arregloParticipantes:eventoPorMedicamento,
            nombreDelEvento: nombreEvento,
        })
    }
}





