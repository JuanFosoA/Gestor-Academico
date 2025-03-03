import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from 'src/deparments/departments.module';
import { Registration } from 'src/registrations/registration.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Registration]),
    DepartmentsModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService]
})
export class CoursesModule {}
