import { Course } from "src/courses/course.entity";
import { Student } from "src/students/student.entity";
import { Collection, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'tests'})
export class Test{
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    codigo:string

    @Column()
    descripcion:string

    @Column({type:'date'})
    fecha:Date

    @Column()
    courseId:number

    @Column()
    studentDocument:string

    @Column('decimal', { precision: 5, scale: 2, nullable: true })
    grade:number

    @ManyToOne(()=>Course,(course)=>course.tests)
    course: Course

    @ManyToOne(()=>Student,(student)=>student.tests)
    student:Student
}