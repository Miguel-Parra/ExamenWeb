import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolPorUsuarioEntity} from "../rolPorUsuario/rolPorUsuario.entity";

@Entity('rol')

export class RolEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'nombre_rol',
        type: "varchar",
        length: 30
    })
    nombreRol: string;

    @OneToMany(
        type => RolPorUsuarioEntity,
    rolPorUsuario => rolPorUsuario.rol
    )
    rolesPorUsuario: RolPorUsuarioEntity[];

}