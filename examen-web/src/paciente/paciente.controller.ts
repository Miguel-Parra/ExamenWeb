import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Paciente, PacienteService} from "./paciente.service";
import {PacienteEntity} from "./paciente.entity";
import {Like} from "typeorm";

@Controller('paciente')

export class PacienteController {
    constructor(private readonly _pacienteService: PacienteService) {
    }

    @Get('paciente')
    async paciente(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string,
    ) {
        let mensaje; // undefined
        let clase; // undefined

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

        let usuarios: PacienteEntity[];
        if (busqueda) {
            const consulta = {
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

            usuarios = await this._pacienteService.buscar(consulta);
        }
        else {
            usuarios = await this._pacienteService.buscar();
        }
        response.render('crear-Paciente', {
            arregloUsuario: usuarios,
            mensajeUsuario: mensaje,
        })
    }

//se inicializa la pantalla de crear usuario
    @Get('crear-Paciente')
    crearPaciente(
        @Res() response
    ) {
        response.render(
            'paciente/crear-paciente'
        )
    }

//CREAR USUARIO Y GUARDAR EN LA BASE DE DATOS
    @Post('crear-paciente')
    async crearPacienteFuncion(
        @Body() paciente: Paciente,
        @Res() response
    ) {

        await this._pacienteService.crear(paciente);

        const parametrosConsulta = `?accion=crear&nombre=${paciente.nombres}`;

        response.redirect('paciente' + parametrosConsulta)
    }


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

        response.redirect('paciente' + parametrosConsulta);
    }


    /////actualizar datos del usuario

    @Get('actualizar-usuario/:idUsuario')
    async actualizarUsuario(
        @Param('idUsuario') idUsuario: string,
        @Res() response
    ) {
        const usuarioAActualizar = await this
            ._pacienteService
            .buscarPorId(Number(idUsuario));

        response.render(
            'crear-paciente', {//ir a la pantalla de crear-usuario
                paciente: usuarioAActualizar
            }
        )
    }


    @Post('actualizar-paciente/:idPaciente')
    async actualizarPacienteFormulario(
        @Param('idPaciente') idPaciente: string,
        @Res() response,
        @Body() paciente: Paciente
    ) {
        paciente.id = +idPaciente;

        await this._pacienteService.actualizar(+idPaciente, paciente);

        const parametrosConsulta = `?accion=actualizar&nombre=${paciente.nombres}`;

        response.redirect('/Usuario/usuario' + parametrosConsulta);

    }
}

