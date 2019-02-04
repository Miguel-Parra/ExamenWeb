import {Body, Controller, Get, Param, Post, Query, Res} from "@nestjs/common";
import {Medicamento, MedicamentoService} from "./medicamento.service";
import {FindManyOptions, Like} from "typeorm";
import {MedicamentoEntity} from "./medicamento.entity";

@Controller('medicamento')

export class MedicamentoController {
    constructor(private readonly _medicamentoService: MedicamentoService) {
    }


    @Get('medicamento')
    async medicamento(
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

        let medicamentos: MedicamentoEntity[];

        if (busqueda) {

            const consulta: FindManyOptions<MedicamentoEntity> = {
                where: [
                    {
                        gramosAIngerir: Like(`%${busqueda}%`)
                    },
                    {
                        nombreMedicamento: Like(`%${busqueda}%`)
                    },
                    {
                        composicion: Like(`%${busqueda}%`)
                    },
                    {
                        usadoPara: Like(`%${busqueda}%`)
                    },
                    {
                        fechaCaducidad: Like(`%${busqueda}%`)
                    },
                    {
                        numeroPastillas: Like(`%${busqueda}%`)
                    },
                ]
            };

            medicamentos = await this._medicamentoService.buscar(consulta);
        }
        else {
            medicamentos = await this._medicamentoService.buscar();
        }

        response.render('lista-medicamentos',
            {
                arregloMedicamentos: medicamentos,
                mensaje: mensaje
            })
    }

    //se inicializa la pantalla de crear medicamento
    @Get('crear-Medicamento')
    crearMedicamento(
        @Res() response
    ) {
        response.render(
            'crear-Medicamento'
        )
    }

//CREAR USUARIO Y GUARDAR EN LA BASE DE DATOS
    @Post('crear-Medicamento')
    async crearMedicamentoFuncion(
        @Res() response,
        @Body() medicamento: Medicamento
    ) {
        await this._medicamentoService.crear(medicamento);

        const parametrosConsulta = `?accion=crear&nombre=${medicamento.nombreMedicamento}`;

        response.redirect('/medicamento/medicamento' + parametrosConsulta)
    }

    //BORRAR USUARIO

    @Post('borrar/:idMedicamento')
    async borrar(
        @Param('idMedicamento') idMedicamento: string,
        @Res() response
    ) {
        const medicamentoEncontrado = await this._medicamentoService
            .buscarPorId(+idMedicamento);

        await this._medicamentoService.borrar(Number(idMedicamento));

        const parametrosConsulta = `?accion=borrar&nombre=${medicamentoEncontrado.nombreMedicamento}`;

        response.redirect('/medicamento/medicamento' + parametrosConsulta);
    }

    /////actualizar datos del usuario

    @Get('actualizar-Medicamento/:idMedicamento')
    async actualizarMedicamento(
        @Param('idMedicamento') idMedicamento: string,
        @Res() response
    ) {
        const medicamentoActualizar = await this._medicamentoService
            .buscarPorId(Number(idMedicamento));

        response.render(
            'crear-Medicamento', {//ir a la pantalla de crear-usuario
                medicamento: medicamentoActualizar
            }
        )
    }

    @Post('actualizar-Medicamento/:idMedicamento')
    async actualizarMedicamentoFormulario(
        @Param('idMedicamento') idMedicamento: string,
        @Res() response,
        @Body() medicamento: Medicamento
    ) {
        medicamento.id = +idMedicamento;

        await this._medicamentoService.actualizar(+idMedicamento, medicamento);

        const parametrosConsulta = `?accion=actualizar&nombre=${medicamento.nombreMedicamento}`;

        response.redirect('/medicamento/medicamento' + parametrosConsulta);
    }

}

