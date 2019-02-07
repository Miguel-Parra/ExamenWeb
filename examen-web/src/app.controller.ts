
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
import {CreateUsuarioDto} from "./usuario/dto/create-usuario.dto";
import {CreateLoginDto} from "./dto/create-login.dto";
import {validate, ValidationError} from "class-validator";


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
        @Query("mensaje") mensajeObtenido,
        @Query('error') error: string
    ) {
        let mensaje = undefined;

        if(error){
            mensaje = error;
        }

        let mensajeVerificacion=undefined;
        if(mensajeObtenido){
            mensajeVerificacion=mensajeObtenido;
        }
        res.render('login', {mensajeVerificacion: mensajeVerificacion, mensaje:mensaje})
    }

    @Post('login')
    async metodoLogin(
        @Body('correo') correo: string,
        @Body('password') password: string,
        @Res() res,
        @Session() sesion,

    ) {

        let mensaje = undefined;

        const objetoValidacionLogin = new CreateLoginDto();
        objetoValidacionLogin.correo = correo;
        objetoValidacionLogin.password = password;

        const errores: ValidationError[] =
            await validate(objetoValidacionLogin) // Me devuelve un arreglo de validacion de errores

        let listaErrores= []

        errores.forEach((error)=>{
            listaErrores.push(error.constraints["matches"])

            listaErrores.push(error.constraints["isNotEmpty"])
        })
        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores)

            const parametrosConsulta = `?error=${listaErrores}`;

            res.redirect('/login/' + parametrosConsulta)

        } else {

            const autenticacion = await this._usuarioService.autenticar(correo, password)

            if (autenticacion) {
                const idUsuario = autenticacion.id;
                const rolUsuario = await this._rolPorUsuarioServicio.verificarRol(+idUsuario)

                if (rolUsuario) {
                    const nombreRol = rolUsuario.rol.nombreRol
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
            }else{
                res.redirect('/login')
            }
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





