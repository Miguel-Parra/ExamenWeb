import {Controller} from "@nestjs/common";
import {EventoPorMedicamentoService} from "./evento-por-medicamento.service";

@Controller('evento-por-medicamento')

export class EventoPorMedicamentoController {
    constructor( private readonly _eventoPorMedicamentoService: EventoPorMedicamentoService){

    }
    
}