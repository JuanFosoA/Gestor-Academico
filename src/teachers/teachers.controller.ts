import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { TeachersService } from './teachers.service';
import { Teacher } from './teacher.entity';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

/**
 * Controlador para la gestión de profesores.
 * Protegido con `JwtAuthGuard` para requerir autenticación en todas sus rutas.
 */
@Controller('teachers')
@UseGuards(JwtAuthGuard)
export class TeachersController {
  constructor(private teacherService: TeachersService) {}

  /**
   * Obtiene la lista de todos los profesores.
   * @returns Una promesa con la lista de profesores.
   */
  @Get()
  getTeachers(): Promise<Teacher[]> {
    return this.teacherService.getTeachers();
  }

  /**
   * Obtiene un profesor específico por su documento de identidad.
   * @param documento Documento del profesor.
   * @returns El profesor encontrado.
   */
  @Get(':documento')
  getTeacher(@Param('documento') documento: string) {
    return this.teacherService.getTeacher(documento);
  }

  /**
   * Crea un nuevo profesor.
   * @param newTeacher Datos del nuevo profesor.
   * @returns El profesor creado.
   */
  @Post()
  createTeacher(@Body() newTeacher: CreateTeacherDto) {
    return this.teacherService.createTeacher(newTeacher);
  }

  /**
   * Elimina un profesor de la base de datos.
   * @param documento Documento del profesor a eliminar.
   * @returns Resultado de la operación.
   */
  @Delete(':documento')
  deleteTeacher(@Param('documento') documento: string) {
    return this.teacherService.deleteTeacher(documento);
  }

  /**
   * Actualiza los datos de un profesor existente.
   * @param documento Documento del profesor a actualizar.
   * @param teacher Datos actualizados del profesor.
   * @returns Resultado de la operación.
   */
  @Patch(':documento')
  updateTeacher(
    @Param('documento') documento: string,
    @Body() teacher: UpdateTeacherDto,
  ) {
    return this.teacherService.updateTeacher(documento, teacher);
  }
}
