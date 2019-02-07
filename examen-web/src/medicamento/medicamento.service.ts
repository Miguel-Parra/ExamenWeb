import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {MedicamentoEntity} from "./medicamento.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {PacienteEntity} from "../paciente/paciente.entity";
import {Paciente} from "../paciente/paciente.service";

@Injectable()
export class MedicamentoService {
    constructor (
        @InjectRepository(MedicamentoEntity)
        private readonly _medicamentoRepository: Repository<MedicamentoEntity>){

    }


    async buscarPorIdPacie(idPaciente: number):Promise <MedicamentoEntity[]>{
        const medicamentoUsuario: FindManyOptions<MedicamentoEntity> =
            { where: {
                    paciente: idPaciente
                }}
        return await this._medicamentoRepository.find(medicamentoUsuario)
    }




    //buscar
    buscar( parametros?: FindManyOptions<MedicamentoEntity>): Promise<MedicamentoEntity[]> {
        return this._medicamentoRepository.find(parametros)
    }

    async crear(nuevoMedicamento: Medicamento): Promise<MedicamentoEntity> {

        // Instanciar una entidad -> .create()
        const medicamentoEntity = this._medicamentoRepository.create(nuevoMedicamento);
        const medicamentoCreado = await this._medicamentoRepository.save(medicamentoEntity);
        return medicamentoCreado;
    }

    actualizar(id: number, nuevoMedicamento: Medicamento): Promise<MedicamentoEntity> {

        nuevoMedicamento.id = id;
        const medicamentoEntity = this._medicamentoRepository.create(nuevoMedicamento);
        return this._medicamentoRepository.save(medicamentoEntity)
    }

    borrar(id: number): Promise<MedicamentoEntity> {
        const medicamentoEntityEliminar = this._medicamentoRepository.create({
            id: id
        });
        return this._medicamentoRepository.remove(medicamentoEntityEliminar)
    }

    buscarPorId(id: number): Promise<MedicamentoEntity> {
        return this._medicamentoRepository.findOne(id)
    }

   async buscarPorIdPaciente(idPaciente: number):Promise <MedicamentoEntity[]>{
        const medicamentoUsuario: FindManyOptions<MedicamentoEntity> =
            { where: {
                paciente: idPaciente
                }}
                return await this._medicamentoRepository.find(medicamentoUsuario)
    }




}

export interface Medicamento{
    id?:number;
    gramosAIngerir: number;
    nombreMedicamento: string;
    composicion: string;
    usadoPara: string;
    fechaCaducidad: Date;
    numeroPastillas: number;
}