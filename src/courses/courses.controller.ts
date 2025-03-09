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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(private courseService: CoursesService) {}

  @Get()
  getCourses(): Promise<Course[]> {
    const courses = this.courseService.getCourses();
    return courses;
  }

  @Get(':id')
  getCourse(@Param('id', ParseIntPipe) id: number) {
    const course = this.courseService.getCourse(id);
    return course;
  }

  @Post()
  createCourse(@Body() newCourse: CreateCourseDto) {
    return this.courseService.createCourse(newCourse);
  }

  @Delete(':id')
  deleteCourse(@Param('id', ParseIntPipe) id: number) {
    const course = this.courseService.deleteCourse(id);
    return course;
  }

  @Patch(':id')
  updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() course: UpdateCourseDto,
  ) {
    const updatedCourse = this.courseService.updateCourse(id, course);
    return updatedCourse;
  }

}
