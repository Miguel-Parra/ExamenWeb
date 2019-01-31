import {PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany, Column} from "typeorm";

import {EventoPorMedicamentoEntity} from "../eventoPorMedicamento/eventoPorMedicamento.entity";

@Entity('evento')
export class EventoEntity {
     @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "nombre_evento",
        type: "varchar",
        length: 40
    })
    nombreEvento: string;

    @Column({
        name: "fecha_evento",
        type: "varchar",
        length: 15
    })
    fechaEvento: string;

    @Column({
        name: "latitud",
        type: "decimal",
    })
    latitud: number;

    @Column({
        name: "longitud",
        type: "decimal",
    })
    longitud: number;

    @OneToMany(
        type => EventoPorMedicamentoEntity,
        eventoPorMedicamento => eventoPorMedicamento.evento
    )
    eventosPorMedicamento: EventoPorMedicamentoEntity[]

}