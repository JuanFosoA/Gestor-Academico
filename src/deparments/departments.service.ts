import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { Course } from 'src/courses/course.entity';
import { Teacher } from 'src/teachers/teacher.entity';

/**
 * Servicio que gestiona la lógica de negocio relacionada con los departamentos.
 */
@Injectable()
export class DepartmentsService {
  constructor(
    /**
     * Repositorio para la entidad `Department`.
     */
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    
    /**
     * Repositorio para la entidad `Course`.
     */
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    /**
     * Repositorio para la entidad `Teacher`.
     */
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  /**
   * Crea un nuevo departamento en la base de datos.
   * @param department Datos del nuevo departamento.
   * @returns El departamento creado.
   * @throws `HttpException` si el departamento ya existe.
   */
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

  /**
   * Obtiene todos los departamentos almacenados en la base de datos.
   * @returns Lista de departamentos.
   */
  async getDepartments() {
    return await this.departmentRepository.find();
  }

  /**
   * Obtiene un departamento por su ID.
   * @param id ID del departamento a buscar.
   * @returns El departamento encontrado.
   * @throws `HttpException` si el departamento no existe.
   */
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

  /**
   * Elimina un departamento por su ID.
   * @param id ID del departamento a eliminar.
   * @returns Resultado de la eliminación.
   * @throws `HttpException` si el departamento tiene cursos o profesores asociados o si no existe.
   */
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

  /**
   * Actualiza un departamento existente en la base de datos.
   * @param id ID del departamento a actualizar.
   * @param department Datos actualizados del departamento.
   * @returns El departamento actualizado.
   * @throws `HttpException` si el departamento no existe.
   */
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
