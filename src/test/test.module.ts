import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './test.entity';
import { CoursesModule } from 'src/courses/courses.module';
import { StudentsModule } from 'src/students/students.module';
import { Registration } from 'src/registrations/registration.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([Test,Registration]),
    CoursesModule,
    StudentsModule
  ],
  controllers: [TestController],
  providers: [TestService, JwtStrategy]
})
export class TestModule {}
