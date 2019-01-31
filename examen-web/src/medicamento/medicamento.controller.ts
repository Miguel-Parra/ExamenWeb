import {Controller} from "@nestjs/common";
import {MedicamentoService} from "./medicamento.service";

@Controller('medicamento')

export class MedicamentoController {
    constructor ( private readonly _medicamentoService: MedicamentoService){}

}