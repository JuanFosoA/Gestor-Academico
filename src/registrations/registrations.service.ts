import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Registration, RegistrationStatus } from './registration.entity';
import { Repository } from 'typeorm';
import { CreateRegistrationDto } from './dto/create-registration-dto';
import { UpdateRegistrationDto } from './dto/update-registration-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeachersService } from 'src/teachers/teachers.service';
import { CoursesService } from 'src/courses/courses.service';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
    private teacherService: TeachersService,
    private coursesService: CoursesService,
    private studentsService: StudentsService,
  ) {}

  /**
   * Crea una nueva inscripción en un curso para un estudiante.
   * 
   * @param registration - Datos de la inscripción a crear.
   * @throws {HttpException} - Si el estudiante ya está inscrito en el curso y no está en estado "REPROBADO" o "SIN_CURSAR".
   * @returns La inscripción creada.
   */
  async createRegistration(registration: CreateRegistrationDto) {
    const { studentCedula, courseId, teacherDocumento } = registration;

    // Verificar la existencia del profesor, estudiante y curso
    await this.teacherService.getTeacher(teacherDocumento);
    await this.studentsService.getStudent(studentCedula);
    await this.coursesService.getCourse(courseId);

    // Buscar una inscripción previa del estudiante en el mismo curso
    const existingRegistration = await this.registrationRepository.findOne({
      where: { studentCedula, courseId },
      order: { fecha_inscripcion: 'DESC' },
    });

    // Verificar si el estudiante puede volver a inscribirse en el curso
    if (
      existingRegistration &&
      existingRegistration.estado !== RegistrationStatus.REPROBADO &&
      existingRegistration.estado !== RegistrationStatus.SIN_CURSAR
    ) {
      throw new HttpException(
        'Student cannot enroll in this course again',
        HttpStatus.CONFLICT,
      );
    }

    // Crear la nueva inscripción con estado "CURSANDO"
    const newRegistration = this.registrationRepository.create({
      ...registration,
      estado: RegistrationStatus.CURSANDO,
    });

    return this.registrationRepository.save(newRegistration);
  }

  /**
   * Obtiene todas las inscripciones registradas.
   * 
   * @returns Lista de inscripciones.
   */
  async getRegistrations() {
    return await this.registrationRepository.find();
  }

  /**
   * Obtiene una inscripción específica por su ID.
   * 
   * @param id - ID de la inscripción a buscar.
   * @throws {HttpException} - Si la inscripción no existe.
   * @returns La inscripción encontrada.
   */
  async getRegistration(id: number) {
    const registrationFound = await this.registrationRepository.findOne({
      where: { id },
    });

    if (!registrationFound) {
      return new HttpException('Registration not found', HttpStatus.NOT_FOUND);
    }
    return registrationFound;
  }

  /**
   * Cancela una inscripción actualizando su estado a "CANCELADO".
   * 
   * @param id - ID de la inscripción a cancelar.
   * @throws {HttpException} - Si la inscripción no existe.
   * @returns Mensaje de confirmación y resultado de la actualización.
   */
  async deleteRegistration(id: number) {
    const result = await this.registrationRepository.update(
      { id },
      { estado: RegistrationStatus.CANCELADO },
    );

    if (result.affected === 0) {
      return new HttpException('Registration not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Registration status updated to CANCELADO', result };
  }

  /**
   * Actualiza los datos de una inscripción existente.
   * 
   * @param id - ID de la inscripción a actualizar.
   * @param user - Datos actualizados de la inscripción.
   * @throws {HttpException} - Si la inscripción no existe.
   * @returns Resultado de la actualización.
   */
  async updateRegistration(id: number, user: UpdateRegistrationDto) {
    const result = await this.registrationRepository.update({ id }, user);

    if (result.affected === 0) {
      return new HttpException('Registration not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
