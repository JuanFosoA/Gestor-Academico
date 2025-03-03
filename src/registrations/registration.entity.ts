import { Grade } from "src/grades/grade.entity";
import { Teacher } from "src/teachers/teacher.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'registrations'})
export class Registration{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    fecha_inscripcion:Date

    @Column({nullable:true})
    nota_final : number

    @Column()
    teacherDocumento: string

    @OneToOne(()=>Grade)
    @JoinColumn()
    grade: Grade

    @ManyToOne(()=>Teacher, teacher=>teacher.registrations)
    teacher:Teacher
}