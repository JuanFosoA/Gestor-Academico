import { Injectable } from "@nestjs/common";
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

  createDepartment(department: CreateDepartmentDto) {
    const newDepartment = this.deparmentRepository.create(department);
    return this.deparmentRepository.save(newDepartment);
  }

  getDepartments() {
    return this.deparmentRepository.find();
  }

  getDepartment(id: number) {
    return this.deparmentRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  deleteDepartment(id: number) {
    return this.deparmentRepository.delete({ id })
  }

  updateDepartment(id: number, department: CreateDepartmentDto) {
    return this.deparmentRepository.update({ id }, department)
  }
}
