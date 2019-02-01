import {Controller, Get, Res} from "@nestjs/common";
import {MedicamentoService} from "./medicamento.service";

@Controller('medicamento')

export class MedicamentoController {
    constructor ( private readonly _medicamentoService: MedicamentoService){}

    @Get('crearMedicamento')
    mostrarCrearMedicamento(
        @Res() response,
    ) {
        response.render('crearMedicamento')
    }
}

export interface Medicamento{
    id?:number;
    gramosAIngerir: number;
    nombreMedicamento: string;
    composicion: string;
    usadoPara: string;
    fechaCaducidad: string;
    numeroPastillas: string;
}