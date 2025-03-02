import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { DeparmentsService } from "./deparments.service";
import { Department } from "./deparment.entity";

@Controller("deparments")
export class DeparmentsController {
  constructor(private deparmentsService: DeparmentsService) {}

  @Get()
  async getDepartments(): Promise<Department[]> {
    const departments = await this.deparmentsService.getDepartments();
    return departments
  }
  
  @Get(":id")
  async getDepartment(@Param("id", ParseIntPipe) id: number): Promise<Department> {
    const department = await this.deparmentsService.getDepartment(id);
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department
  }

  @Post()
  createUser(@Body() newDepartment: CreateDepartmentDto) {
    return this.deparmentsService.createDepartment(newDepartment);
  }

  @Delete(":id")
  async deleteDepartment(@Param("id", ParseIntPipe) id: number){
    const deparment = await this.deparmentsService.deleteDepartment(id)
    return deparment
  }

  @Patch(':id')
  async updateDepartment(@Param('id', ParseIntPipe) id:number, 
                  @Body() department: CreateDepartmentDto) {
    const updatedDepartment = await this.deparmentsService.updateDepartment(id, department)
    return updatedDepartment
  }
}
