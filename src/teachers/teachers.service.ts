import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { DepartmentsService } from 'src/deparments/departments.service';

/**
 * Servicio encargado de la gestión de profesores.
 */
@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,

    private departmentService: DepartmentsService,
  ) {}

  /**
   * Crea un nuevo profesor en la base de datos.
   * @param teacher Datos del profesor a crear.
   * @returns El profesor creado.
   * @throws HttpException si el departamento no existe o el profesor ya está registrado.
   */
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
      throw new HttpException('Teacher already exists', HttpStatus.CONFLICT);
    }

    const newTeacher = this.teacherRepository.create(teacher);
    return this.teacherRepository.save(newTeacher);
  }

  /**
   * Obtiene la lista de todos los profesores.
   * @returns Lista de profesores con sus departamentos asociados.
   */
  getTeachers() {
    return this.teacherRepository.find({
      relations: ['department'],
    });
  }

  /**
   * Obtiene un profesor por su documento de identidad.
   * @param documento Documento del profesor a buscar.
   * @returns El profesor encontrado.
   * @throws HttpException si el profesor no existe.
   */
  async getTeacher(documento: string) {
    const teacherFound = await this.teacherRepository.findOne({
      where: { documento },
    });

    if (!teacherFound) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }
    return teacherFound;
  }

  /**
   * Elimina un profesor de la base de datos.
   * @param documento Documento del profesor a eliminar.
   * @returns Resultado de la operación de eliminación.
   * @throws HttpException si el profesor no existe.
   */
  async deleteTeacher(documento: string) {
    const result = await this.teacherRepository.delete({ documento });

    if (result.affected === 0) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  /**
   * Actualiza los datos de un profesor existente.
   * @param documento Documento del profesor a actualizar.
   * @param user Datos actualizados del profesor.
   * @returns Resultado de la operación de actualización.
   * @throws HttpException si el departamento no existe o si el profesor no se encuentra.
   */
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
