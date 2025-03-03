import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { CoursesService } from 'src/courses/courses.service';
import { Course } from 'src/courses/course.entity';
import { Teacher } from 'src/teachers/teacher.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async createDepartment(department: CreateDepartmentDto) {
    const departmentFound = await this.departmentRepository.findOne({
      where: {
        nombre: department.nombre,
      },
    });

    if (departmentFound) {
      throw new HttpException('Department already exists', HttpStatus.CONFLICT);
    }

    const newDepartment = this.departmentRepository.create(department);
    return this.departmentRepository.save(newDepartment);
  }

  async getDepartments() {
    return await this.departmentRepository.find();
  }

  async getDepartment(id: number) {
    const departmentFound = await this.departmentRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!departmentFound) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    return departmentFound;
  }

  async deleteDepartment(id: number) {
    const coursesCount = await this.courseRepository.count({
      where: { department: { id } },
    });

    if (coursesCount > 0) {
      throw new HttpException(
        'No se puede eliminar el departamento porque tiene cursos asociados',
        HttpStatus.BAD_REQUEST,
      );
    }

    const teachersCount = await this.teacherRepository.count({
      where: { department: { id } },
    });

    if (teachersCount > 0) {
      throw new HttpException(
        'No se puede eliminar el departamento porque tiene profesores asociados',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.departmentRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateDepartment(id: number, department: CreateDepartmentDto) {
    const departmentFound = await this.departmentRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!departmentFound) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    const updateDepartment = Object.assign(departmentFound, department);
    return this.departmentRepository.save(updateDepartment);
  }
}
