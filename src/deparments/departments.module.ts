import { Module } from '@nestjs/common';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Course } from 'src/courses/course.entity';
import { Teacher } from 'src/teachers/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Course, Teacher])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
  exports: [DepartmentsService],
})
export class DepartmentsModule {}
