import { CommonDto } from './common.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateStudentInfoDto extends PartialType(CommonDto) {
  studentId: number;
  schoolId: number;
}
