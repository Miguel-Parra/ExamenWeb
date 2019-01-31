import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm"
import {EventoPorMedicamentoEntity} from "./eventoPorMedicamento.entity";
import {EventoPorMedicamentoController} from "./eventoPorMedicamento.controller";
import {EventoPorMedicamentoService} from "./eventoPorMedicamento.service";

@Module(
    {
        imports:[ TypeOrmModule.forFeature([EventoPorMedicamentoEntity]) ],
        controllers:[EventoPorMedicamentoController],
        providers:[EventoPorMedicamentoService],
        exports:[EventoPorMedicamentoService]

    }
)

export class EventoPorMedicamentoModule{

}