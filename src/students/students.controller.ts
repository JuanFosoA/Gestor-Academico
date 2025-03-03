import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.entity';

@Controller('students')
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get()
  getStudents(): Promise<Student[]> {
    const students = this.studentsService.getStudents();
    return students;
  }

  @Get(':id')
  getStudent(@Param('id', ParseIntPipe) id: number) {
    const student = this.studentsService.getStudent(id);
    return student;
  }

  @Post()
  createStudent(@Body() newStudent: CreateStudentDto) {
    return this.studentsService.createStudent(newStudent);
  }

  @Delete(':id')
  deleteStudent(@Param('id', ParseIntPipe) id: number) {
    const student = this.studentsService.deleteStudent(id);
    return student;
  }

  @Patch(':id')
  updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() student: UpdateStudentDto,
  ) {
    const updatedStudent = this.studentsService.updateStudent(id, student);
    return updatedStudent;
  }
}
