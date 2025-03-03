import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeachersService } from './teachers.service';
import { Teacher } from './teacher.entity';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('teachers')
export class TeachersController {
  constructor(private teacherService: TeachersService) {}

  @Get()
  getTeachers(): Promise<Teacher[]> {
    return this.teacherService.getTeachers();
  }

  @Get(':documento')
  getTeacher(@Param('documento') documento: string) {
    return this.teacherService.getTeacher(documento);
  }

  @Post()
  createTeacher(@Body() newTeacher: CreateTeacherDto) {
    return this.teacherService.createTeacher(newTeacher);
  }

  @Delete(':documento')
  deleteTeacher(@Param('documento') documento: string) {
    return this.teacherService.deleteTeacher(documento);
  }

  @Patch(':documento')
  updateTeacher(
    @Param('documento') documento: string,
    @Body() teacher: UpdateTeacherDto,
  ) {
    return this.teacherService.updateTeacher(documento, teacher);
  }
}
