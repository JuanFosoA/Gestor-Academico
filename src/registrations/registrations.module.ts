import { Module } from '@nestjs/common';
import { RegistrationsController } from './registrations.controller';
import { RegistrationsService } from './registrations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './registration.entity';
import { TeachersModule } from 'src/teachers/teachers.module';

@Module({
  imports:[TypeOrmModule.forFeature([Registration]),TeachersModule],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}
