import { Department } from 'src/deparments/department.entity';
import { Registration } from 'src/registrations/registration.entity';
import { Test } from 'src/test/test.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

/**
 * Enum que representa los días de la semana.
 */
export enum DiaSemana {
  LUNES = 'Lunes',
  MARTES = 'Martes',
  MIERCOLES = 'Miércoles',
  JUEVES = 'Jueves',
  VIERNES = 'Viernes',
  SABADO = 'Sábado',
  DOMINGO = 'Domingo',
}

/**
 * Entidad que representa un curso en la base de datos.
 */
@Entity({ name: 'courses' })
export class Course {
  /**
   * Identificador único del curso.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre del curso. Debe ser único.
   */
  @Column({ unique: true })
  nombre: string;

  /**
   * Descripción del curso.
   */
  @Column()
  descripcion: string;

  /**
   * Lista de cursos que son prerrequisitos de este curso.
   */
  @ManyToMany(() => Course)
  @JoinTable({
    name: 'curso_prerrequisito',
    joinColumn: { name: 'curso_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'prerrequisito_id', referencedColumnName: 'id' },
  })
  prerrequisitos: Course[];

  /**
   * Día de la semana en que se imparte el curso.
   */
  @Column({ type: 'enum', enum: DiaSemana })
  dia: DiaSemana;

  /**
   * Hora de inicio del curso.
   */
  @Column({ type: 'time' })
  horaInicio: string;

  /**
   * Hora de finalización del curso.
   */
  @Column({ type: 'time' })
  horaFin: string;

  /**
   * Identificador del departamento al que pertenece el curso.
   */
  @Column()
  departmentId: number;

  /**
   * Relación con el departamento al que pertenece el curso.
   */
  @ManyToOne(() => Department, (department) => department.courses)
  department: Department;

  /**
   * Lista de inscripciones registradas en el curso.
   */
  @OneToMany(() => Registration, (registration) => registration.course)
  registrations: Registration[];

  /**
   * Lista de exámenes asociados al curso.
   */
  @OneToMany(() => Test, (test) => test.course)
  tests: Test[];
}
