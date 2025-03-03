import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async createStudent(student: CreateStudentDto) {
    const studentFound = await this.studentRepository.findOne({
      where: {
        cedula: student.cedula,
      },
    });

    if (studentFound) {
      throw new HttpException('Student already exists', HttpStatus.CONFLICT);
    }

    const today = new Date();
    if (new Date(student.fechaNacimiento) >= today) {
      throw new HttpException(
        'La fecha de nacimiento debe ser anterior a la fecha actual',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newStudent = this.studentRepository.create(student);
    return this.studentRepository.save(newStudent);
  }

  async getStudents() {
    return await this.studentRepository.find();
  }

  async getStudent(id: number) {
    const studentFound = await this.studentRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!studentFound) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    return studentFound;
  }

  async deleteStudent(id: number) {
    const result = await this.studentRepository.delete({ id });

    if (result.affected === 0) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateStudent(id: number, student: UpdateStudentDto) {
    const studentFound = await this.studentRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!studentFound) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    const updateStudent = Object.assign(studentFound, student)
    return this.studentRepository.save(updateStudent)

  }
}
