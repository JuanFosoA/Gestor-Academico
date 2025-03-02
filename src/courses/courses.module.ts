import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsModule } from 'src/deparments/departments.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), DepartmentsModule],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
