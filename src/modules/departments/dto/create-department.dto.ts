import { CommonDto } from './common.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateDepartmentDto extends PartialType(CommonDto) {
  readonly schoolId: number;
}
