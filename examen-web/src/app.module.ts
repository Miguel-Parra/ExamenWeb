import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolEntity} from "./rol/rol.entity";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {MedicamentoEntity} from "./medicamento/medicamento.entity";
import {PacienteEntity} from "./paciente/paciente.entity";
import {RolPorUsuarioEntity} from "./rol-por-usuario/rol-por-usuario.entity";
import {EventoEntity} from "./evento/evento.entity";
import {EventoPorMedicamentoEntity} from "./evento-por-medicamento/evento-por-medicamento.entity";
import {MedicamentoModule} from "./medicamento/medicamento.module";
import {PacienteModule} from "./paciente/paciente.module";
import {RolPorUsuarioModule} from "./rol-por-usuario/rol-por-usuario.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {EventoModule} from "./evento/evento.module";
import {EventoPorMedicamentoModule} from "./evento-por-medicamento/evento-por-medicamento.module";
import {RolModule} from "./rol/rol.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 32769,
      username: 'miguel',
      password: '182025',
      database: 'examenWeb',
      // BDD Ya existe -> synchronized: false
      synchronize: true,
      dropSchema: false
        , //borra la base y se vuelve a crear, buena idea para pruebas pero no para produccion
      entities: [
        RolEntity, UsuarioEntity, MedicamentoEntity, PacienteEntity, RolPorUsuarioEntity, EventoEntity, EventoPorMedicamentoEntity
      ],
    }),
    EventoModule,
    UsuarioModule,
    EventoPorMedicamentoModule,
    PacienteModule,
    MedicamentoModule,
    RolPorUsuarioModule,
    RolModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
