import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './grade.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Grade])],
  providers: [GradesService],
  controllers: [GradesController]
})
export class GradesModule {}
