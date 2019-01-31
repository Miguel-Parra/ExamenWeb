import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolEntity} from "./rol/rol.entity";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MedicamentoEntity} from "./medicamento/medicamento.entity";
import {PacienteEntity} from "./paciente/paciente.entity";
import {RolPorUsuario} from "./rolPorUsuario/rolPorUsuario";
import {EventoEntity} from "./evento/evento.entity";
import {EventoPorMedicamentoEntity} from "./eventoPorMedicamento/eventoPorMedicamento.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 32771,
      username: 'miguel',
      password: '182025',
      database: 'examenWeb',
      // BDD Ya existe -> synchronized: false
      synchronize: true,
      dropSchema: true, //borra la base y se vuelve a crear, buena idea para pruebas pero no para produccion
      entities: [
        RolEntity, UsuarioEntity, MedicamentoEntity, PacienteEntity, RolPorUsuario, EventoEntity, EventoPorMedicamentoEntity
      ],
    })
      ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
