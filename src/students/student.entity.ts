import { Registration } from 'src/registrations/registration.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  cedula: string;

  @Column({ type: 'date' })
  fechaNacimiento: Date;

  @OneToMany(() => Registration, (registration) => registration.student)
  registrations: Registration[];
}
