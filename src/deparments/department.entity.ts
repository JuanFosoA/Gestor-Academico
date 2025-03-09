import { Course } from 'src/courses/course.entity';
import { Teacher } from 'src/teachers/teacher.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

/**
 * Entidad que representa un departamento dentro del sistema.
 */
@Entity({ name: 'departments' })
export class Department {
  /**
   * Identificador único del departamento.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre del departamento. Debe ser único.
   */
  @Column({ unique: true })
  nombre: string;

  /**
   * Lista de cursos asociados a este departamento.
   * Relación OneToMany con la entidad Course.
   */
  @OneToMany(() => Course, (course) => course.department)
  courses: Course[];

  /**
   * Lista de profesores que pertenecen a este departamento.
   * Relación OneToMany con la entidad Teacher.
   */
  @OneToMany(() => Teacher, (teacher) => teacher.department)
  teachers: Teacher[];
}
