import {BadRequestException, Body, Controller, Get, Param, Post, Query, Res, Session} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from "./usuario.entity";
import {PacienteEntity} from "../paciente/paciente.entity";
import {FindManyOptions, Like} from "typeorm";

@Controller('usuario')

export class UsuarioController {
    constructor( private readonly _usuarioService: UsuarioService){

    }

@Get('inicio')
async mostrarUsuario(
    @Res() res,
    @Session() sesion,
    @Query('accion') accion:string,
    @Query('nombre') nombre:string,
    @Query('busqueda') busqueda:string
){
    if(sesion.rol==='administrador') {
        let mensaje = undefined;
        console.log(sesion)

        if (accion && nombre) {
            switch (accion) {
                case 'actualizar':
                    mensaje = `Rol al usuario ${nombre} actualizado`;
                    break;
                case 'borrar':
                    mensaje = `Registro ${nombre} eliminado`;
                    break;
            }
        }

        let usuarios: UsuarioEntity[];

        if (busqueda) {

            const consulta: FindManyOptions<UsuarioEntity> = {
                where: [
                    {
                        nombre: Like(`%${busqueda}%`)
                    },
                    {
                        correo: Like(`%${busqueda}%`)
                    },
                    {
                        fechaNacimiento: Like(`%${busqueda}%`)
                    }
                ]
            };

            usuarios = await this._usuarioService.buscar(consulta);
        } else {

            usuarios = await this._usuarioService.buscar();
        }

        res.render('lista-usuario',
            {
                arregloUsuario: usuarios,
                mensaje: mensaje,

            })
    }else{
        throw new BadRequestException({mensaje: "No tiene acceso a esta vista"});
    }
}





    @Post('borrar/:idUsuario')
    async borrar(
        @Param('idUsuario') idUsuario: string,
        @Res() response
    ) {
        const usuarioEncontrado = await this._usuarioService
            .buscarPorId(+idUsuario);

        await this._usuarioService.borrar(Number(idUsuario));

        const parametrosConsulta = `?accion=borrar&nombre=${usuarioEncontrado.nombre}`;

        response.redirect('/usuario/inicio' + parametrosConsulta);
    }








    @Get('crear-usuario')
    async mostrarCrearUsuario(
        @Res() res,
    ){
        res.render('crear-usuario')
    }

    @Post('crear-usuario')
    async crearUsuarioFuncion(
        @Res() res,
        @Body() datosUsuario
    ){
        const respuesta = await this._usuarioService.crear(datosUsuario)
        res.render('login')
    }

}

export interface Usuario{
    id?:number;
    nombre: string;
    correo: string;
    password: string;
    fechaNacimiento: string
}