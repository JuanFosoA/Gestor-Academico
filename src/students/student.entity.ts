import { Registration } from 'src/registrations/registration.entity';
import { Test } from 'src/test/test.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

/**
 * Entidad que representa a un estudiante en la base de datos.
 */
@Entity({ name: 'students' })
export class Student {
  /**
   * Identificador único del estudiante.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre del estudiante.
   */
  @Column()
  nombre: string;

  /**
   * Cédula del estudiante, debe ser única.
   */
  @Column({ unique: true })
  cedula: string;

  /**
   * Fecha de nacimiento del estudiante.
   */
  @Column({ type: 'date' })
  fechaNacimiento: Date;

  /**
   * Lista de registros de inscripción del estudiante.
   * Relación uno a muchos con la entidad `Registration`.
   */
  @OneToMany(() => Registration, (registration) => registration.student)
  registrations: Registration[];

  /**
   * Lista de pruebas asociadas al estudiante.
   * Relación uno a muchos con la entidad `Test`.
   */
  @OneToMany(() => Test, (test) => test.student)
  tests: Test[];
}
