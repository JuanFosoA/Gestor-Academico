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

  async createRegistration(registration: CreateRegistrationDto) {
    const { studentCedula, courseId, teacherDocumento } = registration;

    await this.teacherService.getTeacher(teacherDocumento);
    await this.studentsService.getStudent(studentCedula);
    await this.coursesService.getCourse(courseId);

    const existingRegistration = await this.registrationRepository.findOne({
      where: { studentCedula, courseId },
      order: { fecha_inscripcion: 'DESC' },
    });

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

    const newRegistration = this.registrationRepository.create({
      ...registration,
      estado: RegistrationStatus.CURSANDO,
    });

    return this.registrationRepository.save(newRegistration);

  }

  async getRegistrations() {
    return await this.registrationRepository.find();
  }

  async getRegistration(id: number) {
    const registrationFound = await this.registrationRepository.findOne({
      where: { id },
    });

    if (!registrationFound) {
      return new HttpException('Registration not found', HttpStatus.NOT_FOUND);
    }
    return registrationFound;
  }

  async deleteRegistration(id: number) {
    const result = await this.registrationRepository.update({id},{estado: RegistrationStatus.CANCELADO});

    if (result.affected === 0) {
      return new HttpException('Registration not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Registration status updated to CANCELADO', result }
  }

  async updateRegistration(id: number, user: UpdateRegistrationDto) {
    const result = await this.registrationRepository.update({ id }, user);

    if (result.affected === 0) {
      return new HttpException('Registration not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
