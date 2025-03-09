import { Course } from 'src/courses/course.entity';
import { Student } from 'src/students/student.entity';
import { Teacher } from 'src/teachers/teacher.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Enumeración que representa los diferentes estados de una inscripción.
 */
export enum RegistrationStatus {
  SIN_CURSAR = 'sin cursar',
  CURSANDO = 'cursando',
  REPROBADO = 'reprobado',
  APROBADO = 'aprobado',
  CANCELADO = 'cancelado'
}

/**
 * Entidad que representa la inscripción de un estudiante en un curso con un profesor asignado.
 */
@Entity({ name: 'registrations' })
export class Registration {
  /**
   * Identificador único de la inscripción.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Fecha en que se realizó la inscripción.
   * Por defecto, se establece en la fecha y hora actual.
   */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_inscripcion: Date;

  /**
   * Nota final obtenida en el curso. Puede ser nula si el curso aún no ha finalizado.
   */
  @Column({ nullable: true })
  nota_final: number;

  /**
   * Documento del profesor asignado al curso.
   */
  @Column()
  teacherDocumento: string;

  /**
   * Identificador del curso en el que se inscribe el estudiante.
   */
  @Column()
  courseId: number;

  /**
   * Cédula del estudiante inscrito en el curso.
   */
  @Column()
  studentCedula: string;

  /**
   * Estado actual de la inscripción.
   * Se inicializa con el valor `SIN_CURSAR` por defecto.
   */
  @Column({
    type: 'enum',
    enum: RegistrationStatus,
    default: RegistrationStatus.SIN_CURSAR,
  })
  estado: RegistrationStatus;

  /**
   * Relación con la entidad `Teacher`. Un profesor puede tener múltiples inscripciones.
   */
  @ManyToOne(() => Teacher, (teacher) => teacher.registrations)
  teacher: Teacher;

  /**
   * Relación con la entidad `Course`. Un curso puede tener múltiples inscripciones.
   */
  @ManyToOne(() => Course, (course) => course.registrations)
  course: Course;

  /**
   * Relación con la entidad `Student`. Un estudiante puede tener múltiples inscripciones.
   */
  @ManyToOne(() => Student, (student) => student.registrations)
  student: Student;
}
