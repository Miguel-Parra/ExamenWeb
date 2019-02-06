import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {PacienteEntity} from "./paciente.entity";
import {PacienteController} from "./paciente.controller";
import {PacienteService} from "./paciente.service";
import {EventoModule} from "../evento/evento.module";

@Module(
    {
        imports:[TypeOrmModule.forFeature([PacienteEntity]), EventoModule],
        controllers:[PacienteController],
        providers:[PacienteService],
        exports:[PacienteService]

    }
)
export class PacienteModule{

}