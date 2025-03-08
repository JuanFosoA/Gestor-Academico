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

@Controller('registrations')
@UseGuards(JwtAuthGuard)
export class RegistrationsController {
  constructor(private registrationService: RegistrationsService) {}
  @Get()
  getRegistrations(): Promise<Registration[]> {
    return this.registrationService.getRegistrations();
  }

  @Get(':id')
  getRegistration(@Param('id') id: number) {
    return this.registrationService.getRegistration(id);
  }

  @Post()
  createRegistration(@Body() newRegistration: CreateRegistrationDto) {
    return this.registrationService.createRegistration(newRegistration);
  }

  @Delete(':id')
  deleteRegistration(@Param('id') id: number) {
    return this.registrationService.deleteRegistration(id);
  }

  @Patch(':id')
  updateRegistration(
    @Param('id') id: number,
    @Body() registration: UpdateRegistrationDto,
  ) {
    return this.registrationService.updateRegistration(id, registration);
  }
}
