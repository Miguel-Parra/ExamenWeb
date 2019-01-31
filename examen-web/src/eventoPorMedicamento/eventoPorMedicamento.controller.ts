import {Controller} from "@nestjs/common";
import {EventoPorMedicamentoService} from "./eventoPorMedicamento.service";

@Controller('eventoPorMedicamento')

export class EventoPorMedicamentoController {
    constructor( private readonly _eventoPorMedicamentoService: EventoPorMedicamentoService){

    }
    
}