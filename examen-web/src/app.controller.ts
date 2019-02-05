import {Get, Controller, Res, Post, Body, Session, BadRequestException} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";
import {RolPorUsuarioService} from "./rol-por-usuario/rol-por-usuario.service";
import {RolService} from "./rol/rol.service";

@Controller()
export class AppController {
    constructor(private readonly _appService: AppService,
                private readonly _usuarioService: UsuarioService,
                private readonly _rolPorUsuarioServicio: RolPorUsuarioService){
    }

    @Get('login')
    mostrarLogin(
        @Res() res
    ) {
        res.render('login')
    }

    @Post('login')
    async metodoLogin(
        @Body('correo') correo: string,
        @Body('password') password: string,
        @Res() res,
        @Session() sesion,

    ) {

        const autenticacion = await this._usuarioService.autenticar(correo, password)

        if (autenticacion) {
            const idUsuario = autenticacion.id;
            const rolUsuario = await this._rolPorUsuarioServicio.verificarRol(+idUsuario)

            if (rolUsuario) {
                const nombreRol=rolUsuario.rol.nombreRol
                sesion.rol = nombreRol
                sesion.correo = correo;
                sesion.idUsuario = idUsuario;
               // console.log(sesion)
                switch (nombreRol) {
                    case 'usuario':
                        res.redirect('paciente/paciente')
                        break;
                    case 'administrador':
                        res.redirect('usuario/inicio')
                        break;
                    default:
                        res.send('Aun no se ha asignado una tarea para este rol')

                }
            } else {
                //res.send('sin rol')
                throw new BadRequestException({mensaje: 'Espere estamos verificando sus datos'})
            }

        } else {
            res.redirect('login')
        }
    }

    @Get('logout')
    async logout(
        @Res() res,
        @Session() sesion,
    )
    {

        sesion.usuario = undefined;
        sesion.destroy()
        res.redirect('login')
    }





}





