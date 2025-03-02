import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Department } from "./deparment.entity";
import { Repository } from "typeorm";
import { CreateDepartmentDto } from "./dto/create-department.dto";

@Injectable()
export class DeparmentsService {
  constructor(
    @InjectRepository(Department)
    private deparmentRepository: Repository<Department>,
  ) { }
  
  async createDepartment(department: CreateDepartmentDto) {
    const departmentFound = await this.deparmentRepository.findOne({
      where: {
        nombre: department.nombre
      }
    })

    if (departmentFound){
      throw new HttpException('Department already exists', HttpStatus.CONFLICT);
    }

    const newDepartment = this.deparmentRepository.create(department);
    return this.deparmentRepository.save(newDepartment);
  }

  async getDepartments() {
    return await this.deparmentRepository.find();
  }

  async getDepartment(id: number) {
    const departmentFound = await this.deparmentRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!departmentFound) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    return departmentFound
  }

  async deleteDepartment(id: number) {
    const result = await this.deparmentRepository.delete({ id })

    if (result.affected === 0) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    return result
  }

  async updateDepartment(id: number, department: CreateDepartmentDto) {
    const departmentFound = await this.deparmentRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!departmentFound) {
      throw new HttpException('Department not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(departmentFound, department)
    return this.deparmentRepository.save(updateUser)
  }
}
