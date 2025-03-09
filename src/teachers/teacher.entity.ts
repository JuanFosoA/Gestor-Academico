import { Department } from 'src/deparments/department.entity';
import { Registration } from 'src/registrations/registration.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

/**
 * Entidad Teacher que representa a los profesores en la base de datos.
 */
@Entity({ name: 'teachers' })
export class Teacher {
  /**
   * Identificador único del profesor.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Documento de identidad del profesor, debe ser único.
   */
  @Column({ unique: true })
  documento: string;

  /**
   * Nombre del profesor.
   */
  @Column()
  nombre: string;

  /**
   * Fecha de contratación del profesor.
   */
  @Column({ type: 'date' })
  fechaContrato: Date;

  /**
   * Identificador del departamento al que pertenece el profesor.
   */
  @Column()
  departmentId: number;

  /**
   * Relación uno a muchos con la entidad Registration.
   */
  @OneToMany(() => Registration, (registration) => registration.teacher)
  registrations: Registration[];

  /**
   * Relación muchos a uno con la entidad Department.
   */
  @ManyToOne(() => Department, (department) => department.teachers)
  department: Department;
}
