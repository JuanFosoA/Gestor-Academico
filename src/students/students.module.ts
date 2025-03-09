import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Registration } from 'src/registrations/registration.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Registration])],
  controllers: [StudentsController],
  providers: [StudentsService, JwtStrategy],
  exports: [StudentsService]
})
export class StudentsModule {}
