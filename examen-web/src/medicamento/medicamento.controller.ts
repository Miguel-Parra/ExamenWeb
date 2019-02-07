import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {Medicamento, MedicamentoService} from "./medicamento.service";
import {FindManyOptions, Like,} from "typeorm";
import {MedicamentoEntity} from "./medicamento.entity";
import {medicamentoDto} from "./dto/medicamento.dto";
import {validate, ValidationError} from "class-validator";

@Controller('medicamento')

export class MedicamentoController {
    constructor(private readonly _medicamentoService: MedicamentoService) {
    }

    @Get('inicio/:idPaciente')
    async mostrarMedicamento(
        @Res() response,
        @Query('accion') accion: string,
        @Query('nombre') nombre: string,
        @Query('busquedaMedicamento') busquedaMedicamento: string,
        @Param('idPaciente') idPaciente: string,
        @Session() sesion
    ) {

        if(sesion.rol==='usuario') {
            let mensaje = undefined;

            console.log(busquedaMedicamento);


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


            let medicamentoUsuario: MedicamentoEntity[];


            if (busquedaMedicamento) {

                const consulta: FindManyOptions<MedicamentoEntity> = {
                    where: [
                        {
                            paciente: idPaciente,
                            nombreMedicamento: Like(`%${busquedaMedicamento}%`)
                        }

                    ]
                };
                medicamentoUsuario = await this._medicamentoService.buscar(consulta);
                console.log(medicamentoUsuario)
            } else {

                medicamentoUsuario = await this._medicamentoService.buscarPorIdPaciente(Number(idPaciente));

            }

            response.render('lista-medicamentos',
                {
                    arregloMedicamentos: medicamentoUsuario,
                    mensaje: mensaje,
                    idPaciente: idPaciente
                }
            )
        }else{
            response.redirect('/login')
        }
    }


    //se inicializa la pantalla de crear medicamento
    @Get('crear-medicamento/:idPaciente')
    crearMedicamento(
        @Res() response,
        @Param('idPaciente') idPaciente: string,
        @Query('error') error: string,
        @Session() sesion
    ) {
        if(sesion.rol==='usuario') {
            let mensaje = undefined;

            if (error) {
                mensaje = error;
            }

            response.render(
                'crear-medicamento',
                {
                    idPaciente: idPaciente,
                    mensaje: mensaje
                }
            )
        }else{
            response.redirect('/login')
        }
    }

//CREAR USUARIO Y GUARDAR EN LA BASE DE DATOS
    @Post('crear-medicamento/:idPaciente')
    async crearMedicamentoFuncion(
        @Res() response,
        @Body() medicamento: Medicamento,
        @Param('idPaciente') idPaciente: string
    ) {

        let mensaje = undefined;

        const objetoValidacionMedicamento = new medicamentoDto();

        medicamento.gramosAIngerir = Number(medicamento.gramosAIngerir)
        objetoValidacionMedicamento.gramosAIngerir = medicamento.gramosAIngerir

        objetoValidacionMedicamento.nombreMedicamento = medicamento.nombreMedicamento
        objetoValidacionMedicamento.composicion = medicamento.composicion
        objetoValidacionMedicamento.usadoPara = medicamento.usadoPara

        const fec = new Date(medicamento.fechaCaducidad).toISOString();
        objetoValidacionMedicamento.fechaCaducidad = fec

        medicamento.numeroPastillas = Number(medicamento.numeroPastillas)
        objetoValidacionMedicamento.numeroPastillas = medicamento.numeroPastillas

        const errores: ValidationError[]=
            await validate(objetoValidacionMedicamento) // Me devuelve un arreglo de validacion de errores

        let listaErrores= []

        errores.forEach((error)=>{
            listaErrores.push(error.constraints["matches"])
            listaErrores.push(error.constraints["isNotEmpty"])
            listaErrores.push(error.constraints["isDateString"])
            listaErrores.push(error.constraints["isBoolean"])
            listaErrores.push(error.constraints["isNumber"])
        })
        const hayErrores = errores.length > 0;

        if(hayErrores){
            console.error(errores)

            const parametrosConsulta = `?error=${listaErrores}`;

            response.redirect('/medicamento/crear-medicamento/' + idPaciente + parametrosConsulta)
        } else {

            await this._medicamentoService.crear(medicamento);

            const parametrosConsulta = `?accion=crear&nombre=${medicamento.nombreMedicamento}`;

            response.redirect('/medicamento/inicio/' + idPaciente + parametrosConsulta)
        }
    }

    //BORRAR USUARIO

    @Post('borrar/:idPaciente/:idMedicamento/')
    async borrar(
        @Param('idMedicamento') idMedicamento: string,
        @Param('idPaciente') idPaciente: string,
        @Res() response
    ) {
        const medicamentoEncontrado = await this._medicamentoService
            .buscarPorId(+idMedicamento);

        await this._medicamentoService.borrar(Number(idMedicamento));

        const parametrosConsulta = `?accion=borrar&nombre=${medicamentoEncontrado.nombreMedicamento}`;

        response.redirect('/medicamento/inicio/' + idPaciente + parametrosConsulta);
    }

    /////actualizar datos del usuario

    @Get('actualizar-medicamento/:idPaciente/:idMedicamento')
    async actualizarMedicamento(
        @Param('idMedicamento') idMedicamento: string,
        @Param('idPaciente') idPaciente: string,
        @Res() response,
        @Query('error') error: string,
        @Session() sesion
    ) {
        if(sesion.rol==='usuario') {
            let mensaje = undefined;

            if (error) {
                mensaje = error;
            }

            const medicamentoActualizar = await this._medicamentoService
                .buscarPorId(Number(idMedicamento));

            response.render(
                'crear-medicamento', {//ir a la pantalla de crear-usuario
                    medicamento: medicamentoActualizar,
                    idPaciente: idPaciente,
                    idMedicamento: idMedicamento,
                    mensaje: mensaje
                }
            )
        }else{
            response.redirect('/login')
        }
    }

    @Post('actualizar-medicamento/:idPaciente/:idMedicamento')
    async actualizarMedicamentoFormulario(
        @Param('idMedicamento') idMedicamento: string,
        @Param('idPaciente') idPaciente: string,
        @Res() response,
        @Body() medicamento: Medicamento
    ) {

        let mensaje = undefined;

        const objetoValidacionMedicamento = new medicamentoDto();

        medicamento.gramosAIngerir = Number(medicamento.gramosAIngerir)
        objetoValidacionMedicamento.gramosAIngerir = medicamento.gramosAIngerir
        objetoValidacionMedicamento.nombreMedicamento = medicamento.nombreMedicamento
        objetoValidacionMedicamento.composicion = medicamento.composicion
        objetoValidacionMedicamento.usadoPara = medicamento.usadoPara
        const fec = new Date(medicamento.fechaCaducidad).toISOString();
        objetoValidacionMedicamento.fechaCaducidad = fec

        medicamento.numeroPastillas = Number(medicamento.numeroPastillas)
        objetoValidacionMedicamento.numeroPastillas = medicamento.numeroPastillas

        const errores: ValidationError[]=
            await validate(objetoValidacionMedicamento) // Me devuelve un arreglo de validacion de errores

        let listaErrores= []

        errores.forEach((error)=>{
            listaErrores.push(error.constraints["matches"])
            listaErrores.push(error.constraints["isNotEmpty"])
            listaErrores.push(error.constraints["isDateString"])
            listaErrores.push(error.constraints["isBoolean"])
            listaErrores.push(error.constraints["isNumber"])
        })
        const hayErrores = errores.length > 0;

        if(hayErrores){
            console.error(errores)

            const parametrosConsulta = `?error=${listaErrores}`;

            response.redirect('/medicamento/actualizar-medicamento/' + idPaciente +"/"+ idMedicamento +  parametrosConsulta)

        } else {

            medicamento.id = +idMedicamento;

            await this._medicamentoService.actualizar(+idMedicamento, medicamento);

            const parametrosConsulta = `?accion=actualizar&nombre=${medicamento.nombreMedicamento}`;


            response.redirect('/medicamento/inicio/' + idPaciente + parametrosConsulta);

        }

    }
}

