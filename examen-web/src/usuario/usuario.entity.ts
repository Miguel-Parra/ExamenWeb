import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolPorUsuario} from "../rolPorUsuario/rolPorUsuario";
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
    type => RolPorUsuario,
    rolPorUsuario => rolPorUsuario.usuario
)
    rolesPorUsuario:  RolPorUsuario[];

    @OneToMany(
        type => PacienteEntity,
        paciente => paciente.usuario
    )
    pacientes: PacienteEntity[]
}