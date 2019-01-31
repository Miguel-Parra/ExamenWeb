import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MedicamentoEntity} from "./medicamento.entity";
import {MedicamentoController} from "./medicamento.controller";
import {MedicamentoService} from "./medicamento.service";

@Module(
    {
        imports:[TypeOrmModule.forFeature([MedicamentoEntity])],
        controllers:[ MedicamentoController],
        providers:[MedicamentoService],
        exports:[MedicamentoService]

    }
)

export class MedicamentoModule{

}