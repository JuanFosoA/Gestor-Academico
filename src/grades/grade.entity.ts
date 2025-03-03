import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'grades'})
export class Grade{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    fecha: Date

    @Column()
    descripcion:string
}