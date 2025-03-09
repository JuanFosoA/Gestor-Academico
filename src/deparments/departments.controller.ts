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
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DepartmentsService } from './departments.service';
import { Department } from './department.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

/**
 * Controlador para manejar las solicitudes relacionadas con los departamentos.
 * Protegido por JWT para requerir autenticación.
 */
@Controller('departments')
@UseGuards(JwtAuthGuard)
export class DepartmentsController {
  constructor(private deparmentsService: DepartmentsService) {}

  /**
   * Obtiene la lista de todos los departamentos.
   * @returns Una promesa con un arreglo de departamentos.
   */
  @Get()
  getDepartments(): Promise<Department[]> {
    const departments = this.deparmentsService.getDepartments();
    return departments;
  }
  
  /**
   * Obtiene un departamento por su ID.
   * @param id ID del departamento a buscar.
   * @returns El departamento encontrado.
   */
  @Get(':id')
  getDepartment(@Param('id', ParseIntPipe) id: number) {
    const department = this.deparmentsService.getDepartment(id);
    return department;
  }

  /**
   * Crea un nuevo departamento.
   * @param newDepartment Datos del departamento a crear.
   * @returns El departamento creado.
   */
  @Post()
  createDepartment(@Body() newDepartment: CreateDepartmentDto) {
    return this.deparmentsService.createDepartment(newDepartment);
  }

  /**
   * Elimina un departamento por su ID.
   * @param id ID del departamento a eliminar.
   * @returns Resultado de la eliminación.
   */
  @Delete(':id')
  deleteDepartment(@Param('id', ParseIntPipe) id: number) {
    const department = this.deparmentsService.deleteDepartment(id);
    return department;
  }

  /**
   * Actualiza un departamento existente.
   * @param id ID del departamento a actualizar.
   * @param department Datos actualizados del departamento.
   * @returns El departamento actualizado.
   */
  @Patch(':id')
  updateDepartment(
    @Param('id', ParseIntPipe) id: number,
    @Body() department: CreateDepartmentDto,
  ) {
    const updatedDepartment = this.deparmentsService.updateDepartment(
      id,
      department,
    );
    return updatedDepartment;
  }
}
