import { RegistrationStatus } from '../registration.entity';
export class CreateRegistrationDto {
  nota_final?: number;
  teacherDocumento: string;
  courseId: number;
  studentCedula: string;
  estado?: RegistrationStatus;
}
