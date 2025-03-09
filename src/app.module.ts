import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DepartmentsModule } from './deparments/departments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersModule } from './teachers/teachers.module';
import { RegistrationsModule } from './registrations/registrations.module';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';

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
    StudentsModule,
    TeachersModule,
    RegistrationsModule,
    TestModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
