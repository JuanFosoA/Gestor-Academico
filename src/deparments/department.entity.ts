import { Course } from 'src/courses/course.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'departments' })
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @OneToMany(() => Course, (course) => course.department)
  courses: Course[];
  // @OneToMany()
  // profesores:
}
