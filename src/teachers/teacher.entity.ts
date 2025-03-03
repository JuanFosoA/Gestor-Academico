import { Department } from 'src/deparments/department.entity';
import { Registration } from 'src/registrations/registration.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'teachers' })
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  documento: string;

  @Column()
  nombre: string;

  @Column({ type: 'date' })
  fecha_contrato: Date;

  @Column()
  departmentId: number;

  @OneToMany(() => Registration, (registration) => registration.teacher)
  registrations: Registration[];

  @ManyToOne(() => Department, (department) => department.teachers)
  department: Department;
}
