import { CommonDto } from './common.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateFamilyDto extends PartialType(CommonDto) {
  readonly schoolId: number;
  readonly studentId: number;
}
