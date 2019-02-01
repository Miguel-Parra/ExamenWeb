import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PacienteEntity} from "../paciente/paciente.entity";
import {EventoPorMedicamentoEntity} from "../evento-por-medicamento/evento-por-medicamento.entity";

@Entity('medicamento')

export class MedicamentoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "gramos_a_ingerir",
        type: "decimal",
    })
    gramosAIngerir: number;

    @Column({
        name: "nombre_medicamento",
        type: "varchar",
        length: 30
    })
    nombreMedicamento: string;

    @Column({
        name: "composicion",
        type: "varchar",
        length: 60
    })
    composicion: string;

    @Column({
        name: "usado_para",
        type: "varchar",
        length: 40

    })
    usadoPara: string;

    @Column({
        name: "fecha_caducidad",
        type: "varchar",
        length: 20
    })
    fechaCaducidad: string;

    @Column({
        name: "numero_pastillas",
        type: "int",
    })
    numeroPastillas: string;

    @ManyToOne(
        type => PacienteEntity,
        paciente => paciente.medicamentos
    )
    paciente: PacienteEntity;

    @OneToMany(
        type => EventoPorMedicamentoEntity,
        eventoPorMedicamento => eventoPorMedicamento.medicamento
    )
    eventosPorMedicamento: EventoPorMedicamentoEntity[]

}
