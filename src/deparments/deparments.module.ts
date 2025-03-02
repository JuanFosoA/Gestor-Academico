import { Module } from '@nestjs/common';
import { DeparmentsController } from './deparments.controller';
import { DeparmentsService } from './deparments.service';

@Module({
  controllers: [DeparmentsController],
  providers: [DeparmentsService],
})
export class DeparmentsModule {}
