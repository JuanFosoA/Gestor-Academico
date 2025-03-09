import { Course } from 'src/courses/course.entity';
import { Student } from 'src/students/student.entity';
import {
  Collection,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Entidad que representa una prueba (test).
 */
@Entity({ name: 'tests' })
export class Test {
  /**
   * Identificador único de la prueba.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Código único de la prueba.
   */
  @Column({ unique: true })
  codigo: string;

  /**
   * Descripción de la prueba.
   */
  @Column()
  descripcion: string;

  /**
   * Fecha en que se realiza la prueba.
   */
  @Column({ type: 'date' })
  fecha: Date;

  /**
   * Identificador del curso asociado a la prueba.
   */
  @Column()
  courseId: number;

  /**
   * Documento del estudiante que realizó la prueba.
   */
  @Column()
  studentDocument: string;

  /**
   * Calificación obtenida en la prueba.
   */
  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  grade: number;

  /**
   * Relación con el curso al que pertenece la prueba.
   */
  @ManyToOne(() => Course, (course) => course.tests)
  course: Course;

  /**
   * Relación con el estudiante que realizó la prueba.
   */
  @ManyToOne(() => Student, (student) => student.tests)
  student: Student;
}
