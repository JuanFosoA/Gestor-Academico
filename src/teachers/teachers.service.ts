import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
    constructor(@InjectRepository(Teacher) 
    private teacherRepository:Repository<Teacher>,
    //private departmentService:DeparmentsService
    ){}

    async createTeacher(teacher:CreateTeacherDto){
        /* const departmentFound = await this.departmentService.getDepartment(teacher.departmentID)

        if(!departmentFound) return new HttpException('Department not found',HttpStatus.NOT_FOUND) */
            
        const teacherFound = await this.teacherRepository.findOne({where:{documento:teacher.documento}})

        if(teacherFound){
            return new HttpException('Teacher already exist',HttpStatus.CONFLICT)
        }

        const newTeacher = this.teacherRepository.create(teacher)
        return this.teacherRepository.save(newTeacher)
    }
    
    getTeachers(){
        return this.teacherRepository.find()
    }

    async getTeacher(documento:string){
        const teacherFound = await this.teacherRepository.findOne({ where:{documento }})

        if(!teacherFound){
            return new HttpException('Teacher not found',HttpStatus.NOT_FOUND)
        }
        return teacherFound;
    }

    async deleteTeacher(documento:string){
        const result = await this.teacherRepository.delete({documento})

        if(result.affected === 0){
            return new HttpException('Teacher not found',HttpStatus.NOT_FOUND)
        }
        return result
    }

    async updateTeacher(documento:string, user: UpdateTeacherDto){
        const result = await this.teacherRepository.update({documento},user)

        if(result.affected === 0){
            return new HttpException('Teacher not found',HttpStatus.NOT_FOUND)
        }
        return result
    }

    

}
