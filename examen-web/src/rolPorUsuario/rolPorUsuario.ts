import {Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {RolEntity} from "../rol/rol.entity";
import {UsuarioEntity} from "../usuario/usuario.entity";

@Entity('rolesPorUsuario')

export class RolPorUsuario {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        type => RolEntity,
        rol => rol.rolesPorUsuario
    )
    rol: RolEntity

    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.rolesPorUsuario
    )
    usuario: UsuarioEntity
    
}