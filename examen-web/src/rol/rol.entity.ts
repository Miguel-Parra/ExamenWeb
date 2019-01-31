import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolPorUsuario} from "../rolPorUsuario/rolPorUsuario";

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
        type => RolPorUsuario,
    rolPorUsuario => rolPorUsuario.rol
    )
    rolesPorUsuario: RolPorUsuario[];

}