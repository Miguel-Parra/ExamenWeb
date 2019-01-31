import {Get, Controller, Res, Post, Body, Session} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";

@Controller()
export class AppController {
    constructor(private readonly _appService: AppService,
                private readonly _usuarioService: UsuarioService) {
    }

    @Get('login')
    mostrarLogin(
        @Res() res
    ) {
        res.render('login')
    }


    @Post('login')
   async  metodoLogin(
        @Body('username') username: string,
        @Body('password') password: string,
        @Res() res,
        @Session() sesion,) {

        const respuesta = await this._usuarioService.autenticar(username, password)
        const idUsuario = respuesta.id;
        const nombre = respuesta.nombre_usuario;
        const ses = {
            roles: [{
                id: ,
                nombre: ''
            }]
        }
no
          if (respuesta) {
            sesion.usuario = username;
            res.send('ok')
        } else {
            res.redirect('login')
        }

    }
}




