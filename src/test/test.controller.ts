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

/**
 * Controlador para gestionar las pruebas (tests).
 */
@Controller('tests')
@UseGuards(JwtAuthGuard)
export class TestController {
  /**
   * Constructor que inyecta el servicio de pruebas.
   * @param testService Servicio de pruebas.
   */
  constructor(private testService: TestService) {}

  /**
   * Obtiene todas las pruebas almacenadas.
   * @returns Lista de pruebas.
   */
  @Get()
  getTests(): Promise<Test[]> {
    return this.testService.getTests();
  }

  /**
   * Obtiene una prueba específica por su código.
   * @param codigo Código de la prueba.
   * @returns Prueba encontrada o error si no existe.
   */
  @Get(':codigo')
  getTest(@Param('codigo') codigo: string) {
    return this.testService.getTest(codigo);
  }

  /**
   * Crea una nueva prueba.
   * @param newTest Datos de la nueva prueba.
   * @returns Prueba creada.
   */
  @Post()
  createTest(@Body() newTest: CreateTestDto) {
    return this.testService.createTest(newTest);
  }

  /**
   * Elimina una prueba por su código.
   * @param codgo Código de la prueba a eliminar.
   * @returns Resultado de la eliminación.
   */
  @Delete(':codgo')
  deleteTest(@Param('codgo') codgo: string) {
    return this.testService.deleteTest(codgo);
  }

  /**
   * Actualiza los datos de una prueba.
   * @param codigo Código de la prueba a actualizar.
   * @param test Datos a actualizar.
   * @returns Resultado de la actualización.
   */
  @Patch(':codigo')
  updateTest(@Param('codigo') codigo: string, @Body() test: UpdateTestDto) {
    return this.testService.updatetest(codigo, test);
  }

  /**
   * Obtiene el promedio de calificaciones de un estudiante en un curso.
   * @param studentDocument Documento del estudiante.
   * @param courseId ID del curso.
   * @returns Promedio de calificaciones.
   */
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
