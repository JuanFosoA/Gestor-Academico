import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesService } from 'src/courses/courses.service';
import { StudentsService } from 'src/students/students.service';
import { Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test-dto';
import { UpdateTestDto } from './dto/update-test-dto';
import { Test } from './test.entity';
import { Registration } from 'src/registrations/registration.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
    private coursesService: CoursesService,
    private studetService: StudentsService,
    @InjectRepository(Registration)
    private registrationRepository:Repository<Registration>
  ) {}
  private averageCache: { [key: string]: number | null } = {}
  async createTest(test: CreateTestDto) {
    const { courseId, studentDocument } = test;

    await this.coursesService.getCourse(courseId);
    await this.studetService.getStudent(studentDocument);

    const newTest = this.testRepository.create({ ...test });
    await this.testRepository.save(newTest);
    const average = await this.getAverageGrade(studentDocument, courseId);
    this.averageCache[`${studentDocument}-${courseId}`] = average;

    return {
      message: 'Test created successfully',
      test: newTest,
    };
  }

  async getTests() {
    return await this.testRepository.find();
  }

  async getTest(codigo: string) {
    const testFound = await this.testRepository.findOne({
      where: { codigo },
    });

    if (!testFound) {
      return new HttpException('test not found', HttpStatus.NOT_FOUND);
    }
    return testFound;
  }

  async deleteTest(codigo: string) {
    const result = await this.testRepository.delete({ codigo });

    if (result.affected === 0) {
      return new HttpException('test not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async updatetest(codigo: string, test: UpdateTestDto) {
    const result = await this.testRepository.update({ codigo }, test);

    if (result.affected === 0) {
      return new HttpException('test not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async getAverageGrade(
    studentDocument: string,
    courseId: number,
  ): Promise<number | null> {
    const result = await this.testRepository
      .createQueryBuilder('test')
      .select('AVG(test.grade)', 'average')
      .where('test.studentDocument = :studentDocument', { studentDocument })
      .andWhere('test.courseId = :courseId', { courseId })
      .getRawOne();

    return result?.average ? parseFloat(result.average) : null;
  }

  async updateEnrollmentGrade(studentDocument: string, courseId: number, average: number) {
    await this.registrationRepository
        .createQueryBuilder()
        .update('registrations')
        .set({ nota_final: average })
        .where('studentDocument = :studentDocument', { studentDocument })
        .andWhere('courseId = :courseId', { courseId })
        .execute();
}
}
