import { CommonDto } from './common.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTeacherInfoDto extends PartialType(CommonDto) {
  teacherId: number;
  schoolId: number;
}
