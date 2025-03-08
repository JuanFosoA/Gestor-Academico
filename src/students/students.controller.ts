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

@Controller('students')
@UseGuards(JwtAuthGuard)
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  getStudents(): Promise<Student[]> {
    const students = this.studentsService.getStudents();
    return students;
  }

  @Get(':cedula')
  getStudent(@Param('cedula') cedula: string) {
    const student = this.studentsService.getStudent(cedula);
    return student;
  }

  @Post()
  createStudent(@Body() newStudent: CreateStudentDto) {
    return this.studentsService.createStudent(newStudent);
  }

  @Delete(':cedula')
  deleteStudent(@Param('cedula') cedula: string) {
    const student = this.studentsService.deleteStudent(cedula);
    return student;
  }

  @Patch(':cedula')
  updateStudent(
    @Param('cedula') cedula: string,
    @Body() student: UpdateStudentDto,
  ) {
    const updatedStudent = this.studentsService.updateStudent(cedula, student);
    return updatedStudent;
  }
}
