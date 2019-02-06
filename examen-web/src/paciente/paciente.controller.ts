import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Paciente, PacienteService} from "./paciente.service";
import {PacienteEntity} from "./paciente.entity";
import {FindManyOptions, Like} from "typeorm";
import {CreatePacienteDto} from "./dto/create-paciente.dto";
import {validate, ValidationError} from "class-validator";
import {EventoEntity} from "../evento/evento.entity";
import {EventoService} from "../evento/evento.service";

@Controller('paciente')

export class PacienteController {
    constructor(private readonly _pacienteService: PacienteService,
                private readonly _eventoService: EventoService) {
    }

    @Get('paciente')
    async paciente(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
        @Session() sesion
    ) {

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

            let pacientes: PacienteEntity[];
            let evento: EventoEntity[]

            if (busqueda) {

                const consulta: FindManyOptions<PacienteEntity> = {
                    where: [
                        {
                            nombres: Like(`%${busqueda}%`)
                        },
                        {
                            apellidos: Like(`%${busqueda}%`)
                        },
                        {
                            fechaNacimiento: Like(`%${busqueda}%`)
                        },
                        {
                            hijos: Like(`%${busqueda}%`)
                        },
                        {
                            tieneSeguro: Like(`%${busqueda}%`)
                        },
                    ]
                };

                pacientes = await this._pacienteService.buscar(consulta);
            } else {

                const consulta: FindManyOptions<PacienteEntity> = {
                    where: [{usuario: sesion.idUsuario}]
                }
                pacientes = await this._pacienteService.buscar(consulta);
            }

            evento = await this._eventoService.buscar()

            response.render('lista-pacientes',
                {
                    arregloPaciente: pacientes,
                    mensaje: mensaje,
                    arregloEvento: evento

                })
        }else{
            throw new BadRequestException({mensaje: "No tiene acceso a esta vista"});
        }
    }

//se inicializa la pantalla de crear usuario
    @Get('crear-Paciente')
    crearPaciente(
        @Res() response,
        @Session() sesion,
        @Query('error') error: string
    ) {
        let mensaje = undefined;

        if(error){
            mensaje = "Datos erroneos";
        }

        if(sesion.rol === 'usuario'){
            response.render(
                'crear-Paciente',{
                    mensaje:mensaje
                }
            )
        }else{
            response.redirect(
                '/login'
            )}
    }

//CREAR USUARIO Y GUARDAR EN LA BASE DE DATOS
    @Post('crear-Paciente')
    async crearPacienteFuncion(
        @Res() response,
        @Body() paciente: Paciente,
        @Session() sesion
    ) {

        let mensaje = undefined;

        const objetoValidacionPaciente = new CreatePacienteDto();

        objetoValidacionPaciente.nombres = paciente.nombres
        objetoValidacionPaciente.apellidos= paciente.apellidos

        const fec = new Date(paciente.fechaNacimiento).toISOString();
        objetoValidacionPaciente.fecha_nacimiento = fec

        paciente.hijos = Number(paciente.hijos)
        objetoValidacionPaciente.hijos= paciente.hijos


        paciente.tieneSeguro=Boolean(Number(paciente.tieneSeguro));
        objetoValidacionPaciente.tieneSeguro = paciente.tieneSeguro;



        const errores: ValidationError[]=
            await validate(objetoValidacionPaciente) // Me devuelve un arreglo de validacion de errores

        const hayErrores = errores.length>0;

        if(hayErrores){
            console.error(errores)

            const parametrosConsulta = `?error=${errores[0].constraints}`;

            response.redirect('/paciente/crear-Paciente/' + parametrosConsulta)
        }else{
            paciente.usuario=sesion.idUsuario;
            await this._pacienteService.crear(paciente);

            const parametrosConsulta = `?accion=crear&nombre=${paciente.nombres}`;

            response.redirect('/paciente/paciente' + parametrosConsulta)
        }}


//BORRAR USUARIO

    @Post('borrar/:idPaciente')
    async borrar(
        @Param('idPaciente') idPaciente: string,
        @Res() response
    ) {
        const pacienteEncontrado = await this._pacienteService
            .buscarPorId(+idPaciente);

        await this._pacienteService.borrar(Number(idPaciente));

        const parametrosConsulta = `?accion=borrar&nombre=${pacienteEncontrado.nombres}`;

        response.redirect('/paciente/paciente' + parametrosConsulta);
    }


    /////actualizar datos del usuario

    @Get('actualizar-Paciente/:idPaciente')
    async actualizarPaciente(
        @Param('idPaciente') idPaciente: string,
        @Res() response,
        @Query('error') error: string
    ) {

        let mensaje = undefined;

        if(error){
            mensaje = "Datos erroneos";
        }

        const usuarioActualizar = await this._pacienteService
            .buscarPorId(Number(idPaciente));

        response.render(
            'crear-Paciente', {//ir a la pantalla de crear-usuario
                paciente: usuarioActualizar,
                mensaje: mensaje
            }
        )
    }

    @Post('actualizar-Paciente/:idPaciente')
    async actualizarPacienteFormulario(
        @Param('idPaciente') idPaciente: string,
        @Res() response,
        @Body() paciente: Paciente
    ) {
        let mensaje = undefined;

        const objetoValidacionPaciente = new CreatePacienteDto();

        objetoValidacionPaciente.nombres = paciente.nombres
        objetoValidacionPaciente.apellidos = paciente.apellidos

        const fec = new Date(paciente.fechaNacimiento).toISOString();
        objetoValidacionPaciente.fecha_nacimiento = fec

        paciente.hijos = Number(paciente.hijos)
        objetoValidacionPaciente.hijos = paciente.hijos


        objetoValidacionPaciente.tieneSeguro = paciente.tieneSeguro

        const errores: ValidationError[] = await validate(objetoValidacionPaciente) // Me devuelve un arreglo de validacion de errores

        const hayErrores = errores.length > 0;

        if (hayErrores) {
            console.error(errores)

            const parametrosConsulta = `?error=${errores[0].constraints}`;

            response.redirect('/paciente/actualizar-Paciente/'+idPaciente + parametrosConsulta)
        } else {
            paciente.id = +idPaciente;

            await this._pacienteService.actualizar(+idPaciente, paciente);

            const parametrosConsulta = `?accion=actualizar&nombre=${paciente.nombres}`;

            response.redirect('/paciente/paciente' + parametrosConsulta);
        }

    }
}

