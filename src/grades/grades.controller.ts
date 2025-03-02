import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { GradesService } from './grades.service';
import { Grade } from './grade.entity';
import { UpdateGradeDto } from './dto/update-grade-dto';
import { CreateGradeDto } from './dto/create-grade-dto';

@Controller('grades')
export class GradesController {
  constructor(private gradeService: GradesService) {}

  @Get()
  getGrades(): Promise<Grade[]> {
    return this.gradeService.getGrades();
  }

  @Get(':id')
  getGrade(@Param('id') id: number) {
    return this.gradeService.getGrade(id);
  }

  @Post()
  createGrade(@Body() newGrade: CreateGradeDto) {

    return this.gradeService.createGrade(newGrade);
  }

  @Delete(':id')
  deleteGrade(@Param('id') id: number) {
    return this.gradeService.deleteGrade(id);
  }

  @Patch(':id')
  updateGrade(
    @Param('id') id: number,
    @Body() grade: UpdateGradeDto,
  ) {
    return this.gradeService.updateGrade(id, grade);
  }
}
