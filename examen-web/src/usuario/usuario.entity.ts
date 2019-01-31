import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolPorUsuarioEntity} from "../rolPorUsuario/rolPorUsuario.entity";
import {PacienteEntity} from "../paciente/paciente.entity";

@Entity('usuario')
export class UsuarioEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "nombre_usuario",
        type: "varchar",
        length: 30
    })
    nombre: string;

    @Column({
        name: "correo",
        type: "varchar",
        length: 50
    })
    correo: string;

    @Column({
        name: "password",
        type: "varchar",
        length: 16
    })
    password: string;

    @Column({
        name: "fecha_nacimiento",
        type: "varchar",
        length: 30
    })
    fechaNacimiento: string

@OneToMany(
    type => RolPorUsuarioEntity,
    rolPorUsuario => rolPorUsuario.usuario
)
    rolesPorUsuario:  RolPorUsuarioEntity[];

    @OneToMany(
        type => PacienteEntity,
        paciente => paciente.usuario
    )
    pacientes: PacienteEntity[]
}