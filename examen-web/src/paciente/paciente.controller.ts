import {Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {PacienteService} from "./paciente.service";

@Controller('paciente')

export class PacienteController {
    constructor(private readonly _pacienteService: PacienteService) {
    }

    @Get('paciente')
    async paciente(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombres') nombre: string,
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
    }


    @Post('crearPaciente')
    async crearPacienteFuncion(
        @Body() paciente: Paciente,
        @Res() response
    ) {

        await this._pacienteService.crear(paciente);

        const parametrosConsulta = `?accion=crear&nombre=${paciente.nombres}`;

        response.redirect('' + parametrosConsulta)
    }
}

    export interface Paciente{
    id?:number;
    nombres:string;
    apellidos:string;
    fechaNacimiento:string;
    hijos: number;
    tieneSeguro: boolean;
}