import {Get, Controller, Res, Post, Body, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";
import {RolPorUsuarioService} from "./rolPorUsuario/rolPorUsuario.service";

@Controller()
export class AppController {
    constructor(private readonly _appService: AppService,
                private readonly _usuarioService: UsuarioService,
                private readonly _rolPorUsuarioServicio: RolPorUsuarioService) {
    }

    @Get('login')
    mostrarLogin(
        @Res() res
    ) {
        res.render('login')
    }

    @Post('login')
    async metodoLogin(
        @Body('username') username: string,
        @Body('password') password: string,
        @Res() res,
        @Session() sesion,
    ) {

        console.log(username,password)
        const respuesta = await this._usuarioService.autenticar(username, password)

        console.log(respuesta)

        if (respuesta) {

            const idUsuario = respuesta.id;


            const existeRol = await this._rolPorUsuarioServicio.acceso(+idUsuario)

            if (existeRol){
                sesion.username =username ;
                sesion.idUsuario = idUsuario;
                sesion.nombreRol = existeRol.id
                res.send('ok')

            }else {
                res.send('sin rol')
            }

        } else {

            res.redirect('login')
        }
    }
}







