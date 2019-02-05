import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {MedicamentoEntity} from "../medicamento/medicamento.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Entity('paciente')
export class PacienteEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "nombres",
        type: "varchar",
        length: 40
    })
    nombres: string;

    @Column({
        name: "apellidos",
        type: "varchar",
        length: 40
    })
    apellidos: string;

    @Column({
        name: "fecha_nacimiento",
        type: "date"
    })
    fechaNacimiento: Date;

    @Column({
        name: "hijos",
        type: "int"
    })
    hijos: number;

    @Column({
        name: "tiene_seguro",
        type: "boolean",
    })
    tieneSeguro: boolean;

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.pacientes
    )
    usuario: UsuarioEntity;

@OneToMany(
    type => MedicamentoEntity,
    medicamento => medicamento.paciente
)
    medicamentos: MedicamentoEntity[];

}