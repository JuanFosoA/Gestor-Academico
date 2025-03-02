import { DiaSemana } from '../course.entity';

export class UpdateCourseDto {
  nombre?: string;
  descripcion?: string;
  prerrequisitos?: number[];
  dia?: DiaSemana;
  horaInicio?: string;
  horaFin?: string;
}
