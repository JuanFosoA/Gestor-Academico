import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Registration } from 'src/registrations/registration.entity';
import { RegistrationStatus } from '../registrations/registration.entity';

/**
 * Servicio para la gestión de estudiantes.
 */
@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,
  ) {}

  /**
   * Crea un nuevo estudiante en la base de datos.
   * @param student Datos del estudiante a crear.
   * @throws HttpException Si el estudiante ya existe o si la fecha de nacimiento no es válida.
   * @returns El estudiante creado.
   */
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

  /**
   * Obtiene la lista de todos los estudiantes.
   * @returns Lista de estudiantes.
   */
  async getStudents() {
    return await this.studentRepository.find();
  }

  /**
   * Obtiene la información de un estudiante por su cédula.
   * @param cedula Cédula del estudiante.
   * @throws HttpException Si el estudiante no se encuentra.
   * @returns Información del estudiante encontrado.
   */
  async getStudent(cedula: string) {
    const studentFound = await this.studentRepository.findOne({
      where: {
        cedula: cedula,
      },
    });

    if (!studentFound) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    return studentFound;
  }

  /**
   * Elimina un estudiante de la base de datos.
   * @param cedula Cédula del estudiante a eliminar.
   * @throws HttpException Si el estudiante está inscrito en un curso activo o no existe.
   * @returns Resultado de la operación de eliminación.
   */
  async deleteStudent(cedula: string) {
    const activeRegistration = await this.registrationRepository.count({
      where: {
        studentCedula: cedula ,
        estado: RegistrationStatus.CURSANDO,
      },
    });
    
    if (activeRegistration > 0) {
      throw new HttpException(
        'Cannot delete student: enrolled in an active registration',
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.studentRepository.delete({ cedula });

    if (result.affected === 0) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  /**
   * Actualiza la información de un estudiante.
   * @param cedula Cédula del estudiante a actualizar.
   * @param student Datos actualizados del estudiante.
   * @throws HttpException Si el estudiante no se encuentra en la base de datos.
   * @returns El estudiante actualizado.
   */
  async updateStudent(cedula: string, student: UpdateStudentDto) {
    const studentFound = await this.studentRepository.findOne({
      where: {
        cedula: cedula,
      },
    });

    if (!studentFound) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    const updateStudent = Object.assign(studentFound, student);
    return this.studentRepository.save(updateStudent);
  }
}
