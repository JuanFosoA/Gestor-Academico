import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { In, Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { DepartmentsService } from 'src/deparments/departments.service';
import { log } from 'node:console';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    private departmentService: DepartmentsService,
  ) {}

  async createTeacher(teacher: CreateTeacherDto) {
    const departmentFound = await this.departmentService.getDepartment(
      teacher.departmentID,
    );

    if (!departmentFound) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }
    const teacherFound = await this.teacherRepository.findOne({
      where: { documento: teacher.documento },
    });

    if (teacherFound) {
      throw new HttpException('Teacher already exist', HttpStatus.CONFLICT);
    }

    const newTeacher = this.teacherRepository.create(teacher);
    return this.teacherRepository.save(newTeacher);
  }

  getTeachers() {
    return this.teacherRepository.find({
      relations: ['department'],
    });
  }

  async getTeacher(documento: string) {
    const teacherFound = await this.teacherRepository.findOne({
      where: { documento },
    });

    if (!teacherFound) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }
    return teacherFound;
  }

  async deleteTeacher(documento: string) {
    const result = await this.teacherRepository.delete({ documento });

    if (result.affected === 0) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateTeacher(documento: string, user: UpdateTeacherDto) {
    if (user.departmentId) {
      const department = await this.departmentService.getDepartment(
        user.departmentId,
      );
      if (!department) {
        throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
      }
    }

    const result = await this.teacherRepository.update({ documento }, user);

    if (result.affected === 0) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
