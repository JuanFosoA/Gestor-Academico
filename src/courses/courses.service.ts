import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Course } from './course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DepartmentsService } from '../deparments/departments.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private deparmentsService: DepartmentsService,
  ) {}

  async createCourse(course: CreateCourseDto) {
    const courseFound = await this.courseRepository.findOne({
      where: {
        nombre: course.nombre,
      },
    });

    if (courseFound) {
      throw new HttpException('Course already exists', HttpStatus.CONFLICT);
    }
    
    const departmentFound = await this.deparmentsService.getDepartment(
      course.departmentId,
    );

    if (!departmentFound) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    if (course.horaInicio >= course.horaFin) {
      throw new HttpException(
        'La hora de inicio debe ser previa a la hora fin',
        HttpStatus.BAD_REQUEST,
      );
    }

    let prerrequisitos: Course[] = [];
    if (course.prerrequisitos && course.prerrequisitos.length > 0) {
      prerrequisitos = await this.courseRepository.find({
        where: { id: In(course.prerrequisitos.map(Number)) },
      });

      if (prerrequisitos.length !== course.prerrequisitos.length) {
        throw new HttpException(
          'Uno o más prerrequisitos no existen',
          HttpStatus.NOT_FOUND,
        );
      }
    }

    const newCourse = this.courseRepository.create({
      ...course,
      prerrequisitos,
    });
    return this.courseRepository.save(newCourse);
  }

  async getCourses() {
    return await this.courseRepository.find({
      relations: ['prerrequisitos', 'department'],
    });
  }

  async getCourse(id: number) {
    const courseFound = await this.courseRepository.findOne({
      where: {
        id: id,
      },
      relations: ['prerrequisitos', 'department'],
    });

    if (!courseFound) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return courseFound;
  }

  async deleteCourse(id: number) {
    const courseFound = await this.courseRepository.findOne({ where: { id } });
    if (!courseFound) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    const referencedCourses = await this.courseRepository.find({
      where: { prerrequisitos: { id } },
      relations: ['prerrequisitos'],
    });

    if (referencedCourses.length > 0) {
      throw new HttpException(
        'Cannot delete course because it is a prerequisite for other courses',
        HttpStatus.CONFLICT,
      );
    }

    const result = await this.courseRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateCourse(id: number, course: UpdateCourseDto) {
    const courseFound = await this.courseRepository.findOne({
      where: {
        id: id,
      },
      relations: ['prerrequisitos'],
    });

    if (!courseFound) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    if (course.prerrequisitos) {
      const prerrequisitos = await this.courseRepository.find({
        where: { id: In(course.prerrequisitos) },
      });

      if (prerrequisitos.length !== course.prerrequisitos.length) {
        throw new HttpException(
          'One or more prerequisites not found',
          HttpStatus.BAD_REQUEST,
        );
      }

      courseFound.prerrequisitos = prerrequisitos;
    }

    const updateCourse = Object.assign(courseFound, {
      ...course,
      prerrequisitos: courseFound.prerrequisitos,
    });
    return this.courseRepository.save(updateCourse);
  }
}
