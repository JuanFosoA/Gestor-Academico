import { Module } from '@nestjs/common';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { DepartmentsModule } from 'src/deparments/departments.module';
import { Registration } from 'src/registrations/registration.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, Registration]),
    DepartmentsModule,
  ],
  controllers: [TeachersController],
  providers: [TeachersService, JwtStrategy],
  exports: [TeachersService],
})
export class TeachersModule {}
