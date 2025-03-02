import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

export enum DiaSemana {
  LUNES = 'Lunes',
  MARTES = 'Martes',
  MIERCOLES = 'Miércoles',
  JUEVES = 'Jueves',
  VIERNES = 'Viernes',
  SABADO = 'Sábado',
  DOMINGO = 'Domingo',
}

@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  descripcion: string;

  @ManyToMany(() => Course)
  @JoinTable({
    name: 'curso_prerrequisito',
    joinColumn: { name: 'curso_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'prerrequisito_id', referencedColumnName: 'id' },
  })
  prerrequisitos: Course[];
  
  @Column({ type: 'enum', enum: DiaSemana })
  dia: DiaSemana;

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFin: string;
}
