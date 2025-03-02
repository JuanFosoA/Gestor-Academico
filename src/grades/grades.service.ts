import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grade } from './grade.entity';
import { CreateGradeDto } from './dto/create-grade-dto';
import { UpdateGradeDto } from './dto/update-grade-dto';

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade) private gradeRepository: Repository<Grade>,
  ) {}

  async createGrade(grade: CreateGradeDto) {
    const gradeFound = await this.gradeRepository.findOne({
      where: { id: grade.id },
    });

    if (gradeFound) {
      return new HttpException('Grade already exist', HttpStatus.CONFLICT);
    }

    const newGrade = this.gradeRepository.create(grade);
    return this.gradeRepository.save(newGrade);
  }

  getGrades() {
    return this.gradeRepository.find();
  }

  async getGrade(id: number) {
    const gradeFound = await this.gradeRepository.findOne({ where: { id } });

    if (!gradeFound) {
      return new HttpException('Grade not found', HttpStatus.NOT_FOUND);
    }
    return gradeFound;
  }

  async deleteGrade(id: number) {
    const result = await this.gradeRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Grade not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updateGrade(id: number, grade: UpdateGradeDto) {
    const result = await this.gradeRepository.update({ id }, grade);

    if (result.affected === 0) {
      return new HttpException('Grade not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
