import {Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {EventoPorMedicamentoService} from "./evento-por-medicamento.service";
import {RolPorUsuarioEntity} from "../rol-por-usuario/rol-por-usuario.entity";
import {RolEntity} from "../rol/rol.entity";
import {RolPorUsuario} from "../rol-por-usuario/rol-por-usuario.service";
import {EventoPorMedicamentoEntity} from "./evento-por-medicamento.entity";

@Controller('evento-por-medicamento')

export class EventoPorMedicamentoController {
    constructor(private readonly _eventoPorMedicamentoService: EventoPorMedicamentoService) {

    }


}







