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
import { RegistrationsService } from './registrations.service';
import { Registration } from './registration.entity';
import { CreateRegistrationDto } from './dto/create-registration-dto';
import { UpdateRegistrationDto } from './dto/update-registration-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

/**
 * Controlador para gestionar las inscripciones de los estudiantes en los cursos.
 * Todas las rutas están protegidas mediante autenticación JWT.
 */
@Controller('registrations')
@UseGuards(JwtAuthGuard)
export class RegistrationsController {
  constructor(private registrationService: RegistrationsService) {}

  /**
   * Obtiene todas las inscripciones registradas en la base de datos.
   * 
   * @returns Una lista de inscripciones.
   */
  @Get()
  getRegistrations(): Promise<Registration[]> {
    return this.registrationService.getRegistrations();
  }

  /**
   * Obtiene una inscripción específica según su ID.
   * 
   * @param id - Identificador de la inscripción a buscar.
   * @returns La inscripción encontrada o una excepción si no existe.
   */
  @Get(':id')
  getRegistration(@Param('id') id: number) {
    return this.registrationService.getRegistration(id);
  }

  /**
   * Crea una nueva inscripción con los datos proporcionados.
   * 
   * @param newRegistration - Datos de la nueva inscripción.
   * @returns La inscripción creada.
   */
  @Post()
  createRegistration(@Body() newRegistration: CreateRegistrationDto) {
    return this.registrationService.createRegistration(newRegistration);
  }

  /**
   * Elimina (cancela) una inscripción existente cambiando su estado a CANCELADO.
   * 
   * @param id - Identificador de la inscripción a cancelar.
   * @returns Mensaje de confirmación o excepción si no se encuentra la inscripción.
   */
  @Delete(':id')
  deleteRegistration(@Param('id') id: number) {
    return this.registrationService.deleteRegistration(id);
  }

  /**
   * Actualiza los datos de una inscripción existente.
   * 
   * @param id - Identificador de la inscripción a actualizar.
   * @param registration - Datos a actualizar.
   * @returns La inscripción actualizada o una excepción si no existe.
   */
  @Patch(':id')
  updateRegistration(
    @Param('id') id: number,
    @Body() registration: UpdateRegistrationDto,
  ) {
    return this.registrationService.updateRegistration(id, registration);
  }
}
