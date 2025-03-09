import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from './test.entity';
import { CreateTestDto } from './dto/create-test-dto';
import { UpdateTestDto } from './dto/update-test-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guards';

@Controller('tests')
@UseGuards(JwtAuthGuard)
export class TestController {
  constructor(private testService: TestService) {}
  @Get()
  getTests(): Promise<Test[]> {
    return this.testService.getTests();
  }

  @Get(':codigo')
  getTest(@Param('codigo') codigo: string) {
    return this.testService.getTest(codigo);
  }

  @Post()
  createTest(@Body() newTest: CreateTestDto) {
    return this.testService.createTest(newTest);
  }

  @Delete(':codgo')
  deleteTest(@Param('codgo') codgo: string) {
    return this.testService.deleteTest(codgo);
  }

  @Patch(':codigo')
  updateTest(@Param('codigo') codigo: string, @Body() test: UpdateTestDto) {
    return this.testService.updatetest(codigo, test);
  }

  @Get('average/:studentDocument/:courseId')
  async getAverage(
    @Param('studentDocument') studentDocument: string,
    @Param('courseId') courseId: number,
  ) {
    const average = await this.testService.getAverageGrade(
      studentDocument,
      courseId,
    );
    return { studentDocument, courseId, average };
  }
}
