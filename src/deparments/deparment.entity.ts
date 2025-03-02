import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'


@Entity({ name: 'departments'})
export class Department {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    nombre: string

    // @OneToMany()
    // profesores: 
}