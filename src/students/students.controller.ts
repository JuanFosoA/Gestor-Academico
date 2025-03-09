import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

/**
 * Controlador para gestionar las operaciones relacionadas con estudiantes.
 */
@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  /**
   * Obtiene la lista de todos los estudiantes registrados.
   * @returns Una lista de objetos `Student`.
   */
  @Get()
  getStudents(): Promise<Student[]> {
    const students = this.studentsService.getStudents();
    return students;
  }

  /**
   * Obtiene la información de un estudiante por su cédula.
   * @param cedula La cédula del estudiante a buscar.
   * @returns Un objeto `Student` si se encuentra el estudiante.
   */
  @Get(':cedula')
  getStudent(@Param('cedula') cedula: string) {
    const student = this.studentsService.getStudent(cedula);
    return student;
  }

  /**
   * Crea un nuevo estudiante en la base de datos.
   * @param newStudent Datos del nuevo estudiante.
   * @returns El estudiante creado.
   */
  @Post()
  createStudent(@Body() newStudent: CreateStudentDto) {
    return this.studentsService.createStudent(newStudent);
  }

  /**
   * Elimina un estudiante por su cédula.
   * @param cedula La cédula del estudiante a eliminar.
   * @returns El resultado de la operación de eliminación.
   */
  @Delete(':cedula')
  deleteStudent(@Param('cedula') cedula: string) {
    const student = this.studentsService.deleteStudent(cedula);
    return student;
  }

  /**
   * Actualiza la información de un estudiante.
   * @param cedula La cédula del estudiante a actualizar.
   * @param student Datos actualizados del estudiante.
   * @returns El estudiante actualizado.
   */
  @Patch(':cedula')
  updateStudent(
    @Param('cedula') cedula: string,
    @Body() student: UpdateStudentDto,
  ) {
    const updatedStudent = this.studentsService.updateStudent(cedula, student);
    return updatedStudent;
  }
}
