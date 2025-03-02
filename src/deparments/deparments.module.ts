import { Module } from '@nestjs/common';
import { DeparmentsController } from './deparments.controller';
import { DeparmentsService } from './deparments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './deparment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DeparmentsController],
  providers: [DeparmentsService],
})
export class DeparmentsModule {}
