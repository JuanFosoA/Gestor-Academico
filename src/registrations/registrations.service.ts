import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Registration } from './registration.entity';
import { Repository } from 'typeorm';
import { CreateRegistrationDto } from './dto/create-registration-dto';
import { UpdateRegistrationDto } from './dto/update-registration-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TeachersService } from 'src/teachers/teachers.service';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private registrationRepository: Repository<Registration>,
    private teacherService: TeachersService
  ) {}

  async createRegistration(registration: CreateRegistrationDto) {
    const teacherFound = await this.teacherService.getTeacher(
      registration.teacherDocumento
    );

    if (!teacherFound)
      return new HttpException('Teacher not found', HttpStatus.NOT_FOUND);

    const registrationFound = await this.registrationRepository.findOne({
      where: { id: registration.id },
    });

    if (registrationFound) {
      return new HttpException(
        'Registration already exist',
        HttpStatus.CONFLICT,
      );
    }

    const newregistration = this.registrationRepository.create(registration);
    return this.registrationRepository.save(newregistration);
  }

  getRegistrations() {
    return this.registrationRepository.find();
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
    const result = await this.registrationRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Registration not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateRegistration(id: number, user: UpdateRegistrationDto) {
    const result = await this.registrationRepository.update({ id }, user);

    if (result.affected === 0) {
      return new HttpException('Registration not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
