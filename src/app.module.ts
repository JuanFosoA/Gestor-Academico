import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentsModule } from './deparments/departments.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'mi_usuario',
        password: 'hola123',
        database: 'gestor_academico',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true
    }),
    DepartmentsModule,
    CoursesModule,
    StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
