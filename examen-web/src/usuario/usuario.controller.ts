import {Body, Controller, Get, Post, Query, Res} from "@nestjs/common";
import {UsuarioService} from "./usuario.service";

@Controller('usuario')

export class UsuarioController {
    constructor( private readonly _usuarioService: UsuarioService){

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