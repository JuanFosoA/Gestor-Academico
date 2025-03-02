import { DiaSemana } from '../course.entity';

export class CreateCourseDto {
  nombre: string;
  descripcion: string;
  prerrequisitos?: number[];
  dia: DiaSemana;
  horaInicio: string;
  horaFin: string;
  departmentId: number;
}
