import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm"
import {EventoPorMedicamentoEntity} from "./evento-por-medicamento.entity";
import {EventoPorMedicamentoController} from "./evento-por-medicamento.controller";
import {EventoPorMedicamentoService} from "./evento-por-medicamento.service";
import {EventoModule} from "../evento/evento.module";
import {MedicamentoModule} from "../medicamento/medicamento.module";

@Module(
    {
        imports:[ TypeOrmModule.forFeature([EventoPorMedicamentoEntity]),EventoModule,MedicamentoModule ],
        controllers:[EventoPorMedicamentoController],
        providers:[EventoPorMedicamentoService],
        exports:[EventoPorMedicamentoService]

    }
)

export class EventoPorMedicamentoModule{

}