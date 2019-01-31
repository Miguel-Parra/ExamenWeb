import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PacienteEntity} from "./paciente.entity";
import {PacienteController} from "./paciente.controller";
import {PacienteService} from "./paciente.service";

@Module(
    {
        imports:[TypeOrmModule.forFeature([PacienteEntity])],
        controllers:[PacienteController],
        providers:[PacienteService],
        exports:[PacienteService]

    }
)

export class PacienteModule{

}