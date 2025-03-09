import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Course } from './course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { DepartmentsService } from '../deparments/departments.service';
import {
  Registration,
  RegistrationStatus,
} from 'src/registrations/registration.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private deparmentsService: DepartmentsService,

    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
  ) {}

  /**
   * Crea un nuevo curso si no existe y si su departamento es válido.
   * @param {CreateCourseDto} course - Datos del curso a crear.
   * @returns {Promise<Course>} Curso creado.
   * @throws {HttpException} Si el curso ya existe, el departamento no se encuentra o hay errores en las horas.
   */
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

  /**
   * Obtiene todos los cursos con sus prerrequisitos y departamentos.
   * @returns {Promise<Course[]>} Lista de cursos.
   */
  async getCourses() {
    return await this.courseRepository.find({
      relations: ['prerrequisitos', 'department'],
    });
  }

  /**
   * Obtiene un curso por su ID.
   * @param {number} id - ID del curso a buscar.
   * @returns {Promise<Course>} Curso encontrado.
   * @throws {HttpException} Si el curso no existe.
   */
  async getCourse(id: number) {
    const courseFound = await this.courseRepository.findOne({
      where: { id },
      relations: ['prerrequisitos', 'department'],
    });

    if (!courseFound) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return courseFound;
  }

  /**
   * Elimina un curso si no es un prerrequisito de otro curso y si no tiene estudiantes activos.
   * @param {number} id - ID del curso a eliminar.
   * @returns {Promise<any>} Resultado de la operación.
   * @throws {HttpException} Si el curso no se puede eliminar.
   */
  async deleteCourse(id: number) {
    // Verificar si el curso es un prerrequisito de otros cursos
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

    // Verificar si hay inscripciones activas en el curso
    const activeRegistration = await this.registrationRepository.count({
      where: {
        course: { id },
        estado: RegistrationStatus.CURSANDO,
      },
    });

    if (activeRegistration > 0) {
      throw new HttpException(
        'Cannot delete course: enrolled in an active registration',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.courseRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  /**
   * Actualiza los datos de un curso existente.
   * @param {number} id - ID del curso a actualizar.
   * @param {UpdateCourseDto} course - Datos del curso a actualizar.
   * @returns {Promise<Course>} Curso actualizado.
   * @throws {HttpException} Si el curso no existe o si los prerrequisitos no son válidos.
   */
  async updateCourse(id: number, course: UpdateCourseDto) {
    const courseFound = await this.courseRepository.findOne({ where: { id } });

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
