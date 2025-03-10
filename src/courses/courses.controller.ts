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
/**
 * Controlador para gestionar los cursos.
 * Protegido con autenticación JWT.
 */
@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(private courseService: CoursesService) {}

  /**
   * Obtiene la lista de todos los cursos.
   * @returns {Promise<Course[]>} Lista de cursos.
   */
  @Get()
  getCourses(): Promise<Course[]> {
    return this.courseService.getCourses();
  }

  /**
   * Obtiene un curso específico por su ID.
   * @param {number} id - ID del curso a obtener.
   * @returns {Promise<Course>} Curso encontrado.
   */
  @Get(':id')
  getCourse(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.getCourse(id);
  }

  /**
   * Crea un nuevo curso.
   * @param {CreateCourseDto} newCourse - Datos del nuevo curso.
   * @returns {Promise<Course>} Curso creado.
   */
  @Post()
  createCourse(@Body() newCourse: CreateCourseDto) {
    return this.courseService.createCourse(newCourse);
  }

  /**
   * Elimina un curso por su ID.
   * @param {number} id - ID del curso a eliminar.
   * @returns {Promise<void>} Resultado de la eliminación.
   */
  @Delete(':id')
  deleteCourse(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.deleteCourse(id);
  }

  /**
   * Actualiza un curso por su ID.
   * @param {number} id - ID del curso a actualizar.
   * @param {UpdateCourseDto} course - Datos actualizados del curso.
   * @returns {Promise<Course>} Curso actualizado.
   */
  @Patch(':id')
  updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() course: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(id, course);
  }
}