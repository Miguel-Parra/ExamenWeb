import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Paciente, PacienteService} from "./paciente.service";
import {PacienteEntity} from "./paciente.entity";
import {FindManyOptions, Like} from "typeorm";

@Controller('paciente')

export class PacienteController {
    constructor(private readonly _pacienteService: PacienteService) {
    }

    @Get('paciente')
    async paciente(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busqueda') busqueda: string
    ) {
        let mensaje = undefined;


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

        if (busqueda) {

            const consulta:FindManyOptions<PacienteEntity> = {
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
        }
        else {
            pacientes = await this._pacienteService.buscar();
        }

        response.render('lista-pacientes',
            {
                arregloPaciente: pacientes,
                mensaje: mensaje
            })
    }

//se inicializa la pantalla de crear usuario
    @Get('crear-Paciente')
    crearPaciente(
        @Res() response
    ) {
        response.render(
            'crear-Paciente'
        )
    }

//CREAR USUARIO Y GUARDAR EN LA BASE DE DATOS
    @Post('crear-Paciente')
    async crearPacienteFuncion(
        @Res() response,
        @Body() paciente: Paciente
    ) {
        await this._pacienteService.crear(paciente);

        const parametrosConsulta = `?accion=crear&nombre=${paciente.nombres}`;

        response.redirect('/paciente/paciente' + parametrosConsulta)
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

        response.redirect('/paciente/paciente' + parametrosConsulta);
    }


    /////actualizar datos del usuario

    @Get('actualizar-Paciente/:idPaciente')
    async actualizarPaciente(
        @Param('idPaciente') idPaciente: string,
        @Res() response
    ) {
        const usuarioActualizar = await this._pacienteService
            .buscarPorId(Number(idPaciente));

        response.render(
            'crear-Paciente', {//ir a la pantalla de crear-usuario
                paciente: usuarioActualizar
            }
        )
    }

    @Post('actualizar-Paciente/:idPaciente')
    async actualizarPacienteFormulario(
        @Param('idPaciente') idPaciente: string,
        @Res() response,
        @Body() paciente: Paciente
    ) {
        paciente.id = +idPaciente;

        await this._pacienteService.actualizar(+idPaciente, paciente);

        const parametrosConsulta = `?accion=actualizar&nombre=${paciente.nombres}`;

        response.redirect('/paciente/paciente' + parametrosConsulta);
    }

    @Post('lista-medicamentos/:idPaciente')
    async medicamentoPaci(
        @Param('idPaciente') idPaciente: string,
        @Res() response,
        @Body() paciente:Paciente
    ){
        response.render('lista-medicamentos')
    }
}

