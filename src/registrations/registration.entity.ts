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

export enum RegistrationStatus {
  SIN_CURSAR = 'sin cursar',
  CURSANDO = 'cursando',
  REPROBADO = 'reprobado',
  APROBADO = 'aprobado',
  CANCELADO = 'cancelado'
}

@Entity({ name: 'registrations' })
export class Registration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_inscripcion: Date;

  @Column({ nullable: true })
  nota_final: number;

  @Column()
  teacherDocumento: string;

  @Column()
  courseId: number;

  @Column()
  studentCedula: string;

  @Column({
    type: 'enum',
    enum: RegistrationStatus,
    default: RegistrationStatus.SIN_CURSAR,
  })
  estado: RegistrationStatus;

  @ManyToOne(() => Teacher, (teacher) => teacher.registrations)
  teacher: Teacher;

  @ManyToOne(() => Course, (course) => course.registrations)
  course: Course;

  @ManyToOne(() => Student, (student) => student.registrations)
  student: Student;
}
