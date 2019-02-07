import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MedicamentoEntity} from "../medicamento/medicamento.entity";
import {EventoEntity} from "../evento/evento.entity";

@Entity('evento_por_mediacamento')
export class EventoPorMedicamentoEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => MedicamentoEntity,
        medicamento => medicamento.eventosPorMedicamento
    )
    medicamento: MedicamentoEntity

    @ManyToOne(
        type => EventoEntity,
        evento => evento.eventosPorMedicamento
    )
    evento: EventoEntity

}