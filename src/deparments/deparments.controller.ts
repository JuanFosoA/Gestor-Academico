import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DeparmentsService } from './deparments.service';
import { Department } from './deparment.entity';

@Controller('deparments')
export class DeparmentsController {
  constructor(private deparmentsService: DeparmentsService) {}

  @Get()
  getDepartments(): Promise<Department[]> {
    const departments = this.deparmentsService.getDepartments();
    return departments
  }
  
  @Get(':id')
  getDepartment(@Param('id', ParseIntPipe) id: number) {
    const department = this.deparmentsService.getDepartment(id);
    return department
  }

  @Post()
  createUser(@Body() newDepartment: CreateDepartmentDto) {
    return this.deparmentsService.createDepartment(newDepartment);
  }

  @Delete(':id')
  deleteDepartment(@Param('id', ParseIntPipe) id: number) {
    const deparment = this.deparmentsService.deleteDepartment(id)
    return deparment
  }

  @Patch(':id')
  updateDepartment(
    @Param('id', ParseIntPipe) id: number,
    @Body() department: CreateDepartmentDto,
  ) {
    const updatedDepartment = this.deparmentsService.updateDepartment(
      id,
      department,
    );
    return updatedDepartment
  }
}
